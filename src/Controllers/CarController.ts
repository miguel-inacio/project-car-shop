import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

export default class CarController {
  constructor(private carService: CarService) {}

  public register = async (req: Request, res: Response, next: NextFunction) => {
    const car: Omit <ICar, 'id'> = {
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

  public findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allCars = await this.carService.findAll();
      return res.status(200).json(allCars);
    } catch (error) {
      next(error);
    }
  };

  public findOne = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const car = await this.carService.findOne(id);
      return res.status(200).json(car);
    } catch (error) {
      next(error);
    }
  };
}
