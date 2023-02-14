import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

export default class CarService {
  public model = new CarODM();

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

  public async findOne(id: string) : Promise<Car | null> {
    const carById = await this.model.findOne(id);
    if (carById === null || !carById.id) throw new Error('Car not found');
    else {
      const result = this.createCarDomain(carById);
      return result;
    }
  }
}
