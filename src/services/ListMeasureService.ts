import { injectable, inject } from "tsyringe";
import MeasureDTO from "../dtos/MeasureDTO";
import IMeasureRepository from "../repositories/IMeasureRepository";
import UpdateMeasureDTO from "../dtos/UpdateMeasureDTO";
import { GenericError } from "../errors/GenericError";

type RequestBody = {
  customer_code: string;
  measure_type?: string;
};

type Measure = {
  measure_uuid: string;
  measure_datetime: Date;
  measure_type: string;
  has_confirmed: boolean;
  image_url: string;
};

type MeasureList = {
  customer_code: string;
  measures: Measure[];
};

@injectable()
class CreateMeasureService {
  constructor(
    @inject("MeasureRepository")
    private measureRepository: IMeasureRepository
  ) {}

  public async run(data: RequestBody): Promise<MeasureList> {
    if (!data.customer_code)
      throw new GenericError(
        "INVALID_DATA",
        404,
        "customer_code é obrigatório"
      );

    // Verifica se measure_type existe, se existir verifica se é de WATER ou de GAS, se for diferente retorna erro.
    if (data.measure_type) {
      const measureTypeUpper = data.measure_type.toUpperCase();

      if (measureTypeUpper !== "WATER" && measureTypeUpper !== "GAS") {
        throw new GenericError(
          "INVALID_TYPE",
          400,
          "Tipo de medição não permitida"
        );
      }
    }

    // Verifica se encontra o measure informado
    const measures = await this.measureRepository.listByCustomerCode(
      data.customer_code,
      data.measure_type
    );
    if (!measures)
      throw new GenericError(
        "MEASURES_NOT_FOUND",
        404,
        "Nenhuma leitura encontrada"
      );

    const measureList: MeasureList = {
      customer_code: data.customer_code,
      measures: [],
    };
    const PORT = process.env.PORT || 3000;
    const HOST = process.env.HOST || "localhost";

    // Percorre a lista de MeasureDTO e converte cada item para Measure
    for (const i of measures) {
      const measure: Measure = {
        measure_uuid: i.id,
        measure_datetime: i.date,
        measure_type: i.type,
        has_confirmed: i.has_confirmed,
        image_url: `http://${HOST}:${PORT}/temp/${i.URI}`,
      };
      measureList.measures.push(measure);
    }

    return measureList;
  }
}

export default CreateMeasureService;
