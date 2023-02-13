import CarController from '../Controllers/CarController';
import CarService from '../Services/CarService';

const carService: CarService = new CarService();
const carController: CarController = new CarController(carService);

export default { carController };