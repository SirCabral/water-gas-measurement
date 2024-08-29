import CreateMeasureDTO from "../dtos/CreateMeasureDTO";
import MeasureDTO from "../dtos/MeasureDTO";

export default interface IMeasureRepository<T = MeasureDTO> {
  create(data: CreateMeasureDTO): Promise<T>;
  update(data: T | CreateMeasureDTO): Promise<T>;
  findById(id: string): Promise<T | null>;
  findMonthlyMeasureByTypeAndCostumer(customer_code: string, type: string, date: Date): Promise<T | null>;
  listByCustomerCode(customer_code: string, measure_type?: string): Promise<T[] | null>;
}