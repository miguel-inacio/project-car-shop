import { NextFunction, Request, Response } from 'express';
import IMotorcyle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

export default class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private motorcycleService: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.motorcycleService = new MotorcycleService();
  }

  public register = async () => {
    const motorcycle: Omit <IMotorcyle, 'id'> = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body?.status,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };
    try {
      const result = await this.motorcycleService.register(motorcycle);
      return this.res.status(201).json(result);
    } catch (error) {
      this.next(error);
    }
  };

  public findAll = async () => {
    try {
      const allMotorcycles = await this.motorcycleService.findAll();
      return this.res.status(200).json(allMotorcycles);
    } catch (error) {
      this.next(error);
    }
  };

  public findOne = async () => {
    const { id } = this.req.params;
    try {
      const motorcycle = await this.motorcycleService.findOne(id);
      return this.res.status(200).json(motorcycle);
    } catch (error) {
      this.next(error);
    }
  };
}
