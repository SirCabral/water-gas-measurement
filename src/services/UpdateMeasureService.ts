import { injectable, inject } from "tsyringe";
import MeasureDTO from "../dtos/MeasureDTO";
import IMeasureRepository from "../repositories/IMeasureRepository";
import UpdateMeasureDTO from "../dtos/UpdateMeasureDTO";
import { GenericError } from "../errors/GenericError";

@injectable()
class CreateMeasureService {
  constructor(
    @inject("MeasureRepository")
    private measureRepository: IMeasureRepository
  ) {}

  public async run(data: UpdateMeasureDTO): Promise<MeasureDTO> {
    // Verifica se encontra o measure informado
    const measure = await this.measureRepository.findById(data.measure_uuid);
    if (!measure)
      throw new GenericError("MEASURE_NOT_FOUND", 404, "UUID não encontrado");

    if (measure.has_confirmed === true)
      throw new GenericError(
        "CONFIRMATION_DUPLICATE",
        409,
        "Leitura do mês ja realizada"
      );

    return this.measureRepository.update({
      ...measure,
      value: data.confirmed_value,
      has_confirmed: true,
    });
  }
}

export default CreateMeasureService;
