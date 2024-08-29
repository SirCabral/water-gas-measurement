import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateMeasureService from '../services/CreateMeasureService';
import UpdateMeasureService from '../services/UpdateMeasureService';
import ListMeasureService from '../services/ListMeasureService';

class MeasureController {
    
  async index(request: Request, response: Response): Promise<Response> {
    const { customer_code } = request.params;
    const measure_type = request.query.measure_type as string;

    const listMeasures = container.resolve(ListMeasureService);
    const data = await listMeasures.run({customer_code, measure_type});
    return response.status(200).json(data);
  }
  async store(request: Request, response: Response): Promise<Response> {
    const createMeasure = container.resolve(CreateMeasureService);
    const measure = await createMeasure.run(request.body);
    const PORT = process.env.PORT || 3000;
    const HOST = process.env.HOST || "localhost";
    return response.status(200).json({url: `http://${HOST}:${PORT}/temp/${measure.URI}`, GUID: measure.id, value: measure.value});
  }
  
  
  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const updateMeasure = container.resolve(UpdateMeasureService);
    await updateMeasure.run({ ...request.body, id });
    return response.status(200).json({success: true});
  }
}

export default new MeasureController();