import { NextFunction, Request, Response } from 'express';

export default class CarValidation {
  public static notFound = (
    error: Error, 
    _req: Request, 
    res: Response, 
    next: NextFunction,
  ) => {
    if (error.message === 'Car not found') { return res.status(404).json(error.message); }
    next(error);
  };
}