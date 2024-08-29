import { injectable, inject } from "tsyringe";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import MeasureDTO from "../dtos/MeasureDTO";
import CreateMeasureDTO from "../dtos/CreateMeasureDTO";
import IMeasureRepository from "../repositories/IMeasureRepository";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GenericError } from "../errors/GenericError";

@injectable()
class CreateMeasureService {
  constructor(
    @inject("MeasureRepository")
    private measureRepository: IMeasureRepository
  ) {}

  public async run(data: CreateMeasureDTO): Promise<MeasureDTO> {
    //Verifica se já existe uma leitura no mês naquele tipo de leitura.
    const customer =
      await this.measureRepository.findMonthlyMeasureByTypeAndCostumer(
        data.customer_code,
        data.measure_type,
        data.measure_datetime
      );
    if (customer)
      throw new GenericError(
        "DOUBLE_REPORT",
        409,
        "Leitura do mês já realizada"
      );

    //Gera a imagem na pasta /temp a partir do Buffer base64
    const image = String(data.image);
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    const fileName = `${uuidv4()}.png`;
    const tempDir = path.join(__dirname, "../temp");
    const filePath = path.join(tempDir, fileName);
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    fs.writeFileSync(filePath, buffer);
    // Foto Salva na pasta /temp

    const APIKEY = process.env.GEMINI_API_KEY || "";
    const fileManager = new GoogleAIFileManager(APIKEY);
    const genAI = new GoogleGenerativeAI(APIKEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
    });
    // Carrega o arquivo na IA Gemini
    const uploadResponse = await fileManager.uploadFile(filePath, {
      mimeType: "image/png",
      displayName: fileName,
    });
    console.log(
      `Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`
    );

    // A Partir da URI da imagem enviada, envia uma solicitação com uma mensagem para ler a foto.
    const result = await model.generateContent([
      {
        fileData: {
          mimeType: uploadResponse.file.mimeType,
          fileUri: uploadResponse.file.uri,
        },
      },
      {
        text: "retorne somente o valor do número no registro no tipo number/integer. isso incluí números em vermelho se tiver no registro. se não encontrar me retorne o valor 0",
      },
    ]);

    // Printa a mensagem gerada pela IA
    console.log(result.response.text());

    return this.measureRepository.create({
      ...data,
      URI: fileName,
      value: Number(result.response.text()),
    });
  }
}

export default CreateMeasureService;
