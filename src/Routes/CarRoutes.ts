import { Router } from 'express';
import CarController from '../Controllers/CarController';

const carRoutes = Router();

carRoutes.post(
  '/',
  (req, res, next) => new CarController(req, res, next).register(),
);

carRoutes.get(
  '/:id',
  (req, res, next) => new CarController(req, res, next).findOne(),
);

carRoutes.get(
  '/',
  (req, res, next) => new CarController(req, res, next).findAll(),
);

export default carRoutes;