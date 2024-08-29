import { Between, getRepository, Repository } from "typeorm";

import CreateMeasureDTO from "../dtos/CreateMeasureDTO";
import Measure from "../models/Measure";
import IMeasureRepository from "./IMeasureRepository";
import { AppDataSource } from "../index";

class MeasureRepository implements IMeasureRepository<Measure> {
  private ormRepository: Repository<Measure>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Measure);
  }

  public async create(data: CreateMeasureDTO): Promise<Measure> {
    return this.ormRepository.save(this.ormRepository.create(
      {
        ...data,
        image: data.image,
        date: data.measure_datetime,
        type: data.measure_type,
    }));
  }

  async update(rack: Measure): Promise<Measure> {
    return this.ormRepository.save(rack);
  }
  async findById(id: string): Promise<Measure | null> {
    return this.ormRepository.findOne({ where: { id } });
  }
 
  //Verifica se já existe uma leitura no mês naquele tipo de leitura.
  async findMonthlyMeasureByTypeAndCostumer(
    customer_code: string,
    type: string,
    date: Date
  ): Promise<Measure | null> {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; 
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0);
  
    return this.ormRepository.findOne({
      where: {
        customer_code,
        type,
        date: Between(startOfMonth, endOfMonth)
      }
    });
  }
 
  // Lista todas as measures de acordo com o customer_code informado
  async listByCustomerCode(
    customer_code: string,
    measure_type?: string
  ): Promise<Measure[]> {
    const query = this.ormRepository
      .createQueryBuilder("measure")
      .where("measure.customer_code = :customer_code", { customer_code });

    if (measure_type) {
      query.andWhere("measure.type = :type", {
        type: measure_type.toUpperCase(),
      });
    }

    return query.getMany();
  }
    
}

export default MeasureRepository;
