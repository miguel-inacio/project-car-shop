import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

export default class CarController {
  constructor(private carService: CarService) {}

  public register = async (req: Request, res: Response, next: NextFunction) => {
    const car: ICar = {
      model: req.body.model,
      year: req.body.year,
      color: req.body.color,
      status: req.body?.status,
      buyValue: req.body.buyValue,
      doorsQty: req.body.doorsQty,
      seatsQty: req.body.seatsQty,
    };
    try {
      const result = await this.carService.register(car);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };
}
