import { NextFunction, Request, Response } from 'express';
import CustomError from '../Error/CustomError';

export default class CarValidation {
  public static notFound = (
    error: CustomError, 
    _req: Request, 
    res: Response, 
    next: NextFunction,
  ) => {
    if (error.getType() === 'car validation') {
      return res.status(error.getStatus()).send({ message: error.message }); 
    }
    next(error);
  };
}