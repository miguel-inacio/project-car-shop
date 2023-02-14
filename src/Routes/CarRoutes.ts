import { Router } from 'express';
import carController from '../Factories/CarFactory';

const carRoutes = Router();

carRoutes.post('/', carController.carController.register);

carRoutes.get('/:id', carController.carController.findOne);

carRoutes.get('/', carController.carController.findAll);

export default carRoutes;