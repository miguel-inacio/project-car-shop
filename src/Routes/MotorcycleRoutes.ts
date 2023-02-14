import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const motorcycleRoutes = Router();

motorcycleRoutes.post(
  '/',
  (req, res, next) => new MotorcycleController(req, res, next).register(),
);

motorcycleRoutes.get(
  '/:id',
  (req, res, next) => new MotorcycleController(req, res, next).findOne(),
);

motorcycleRoutes.get(
  '/',
  (req, res, next) => new MotorcycleController(req, res, next).findAll(),
);

motorcycleRoutes.put(
  '/:id',
  (req, res, next) => new MotorcycleController(req, res, next).update(),
);

motorcycleRoutes.delete(
  '/:id',
  (req, res, next) => new MotorcycleController(req, res, next).delete(),
);

export default motorcycleRoutes;