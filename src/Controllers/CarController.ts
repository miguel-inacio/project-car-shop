import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

export default class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private carService: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.carService = new CarService();
  }

  public register = async () => {
    const car: Omit <ICar, 'id'> = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body?.status,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };
    try {
      const result = await this.carService.register(car);
      return this.res.status(201).json(result);
    } catch (error) {
      this.next(error);
    }
  };

  public findAll = async () => {
    try {
      const allCars = await this.carService.findAll();
      return this.res.status(200).json(allCars);
    } catch (error) {
      this.next(error);
    }
  };

  public findOne = async () => {
    const { id } = this.req.params;
    try {
      const car = await this.carService.findOne(id);
      return this.res.status(200).json(car);
    } catch (error) {
      this.next(error);
    }
  };

  public update = async () => {
    const { id } = this.req.params;
    const newData = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    }; 
  
    try {
      const car = await this.carService.update(id, newData);
      return this.res.status(200).json(car);
    } catch (error) {
      this.next(error);
    }
  };
}
