import Car from '../Domains/Car';
import CustomError from '../Error/CustomError';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

export default class CarService {
  public model = new CarODM();
  public validation = 'car validation';

  public createCarDomain(car: Omit <ICar, 'id'> | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async register(car: Omit <ICar, 'id'>) : Promise<Car | null> {
    const newCar = await this.model.create(car);
    return this.createCarDomain(newCar);
  }

  public async findAll() : Promise<(Car | null)[]> {
    const allCars = await this.model.findAll();
    const result = allCars.map((car) => this.createCarDomain(car));
    return result;
  }

  public async findOne(id: string) : Promise<Car | null | unknown> {
    const isIdValid = this.model.validateMongoId(id);
    if (!isIdValid) {
      throw new CustomError('Invalid mongo id', 422, this.validation);
    } 
    const carById = await this.model.findOne(id);
    if (carById === null || !carById.id) {
      throw new CustomError('Car not found', 404, this.validation);
    } else {
      const result = this.createCarDomain(carById);
      return result;
    }
  }

  public async update(id: string /* newData: Car */) : Promise<void /* Car | null */> {
    const carExists = await this.findOne(id);
    if (!carExists) throw new CustomError('Car not found', 404, this.validation);
  }
}
