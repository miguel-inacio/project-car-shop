import { Router } from 'express';
import carController from '../Factories/CarFactory';

const carRoutes = Router();

carRoutes.post('/', carController.carController.register);

export default carRoutes;