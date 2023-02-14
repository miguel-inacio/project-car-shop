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

  public async register(car: Omit <ICar, 'id'>) {
    const newCar = await this.model.create(car);
    return this.createCarDomain(newCar);
  }

  public async findAll() {
    const allCars = await this.model.findAll();
    const result = allCars.map((car) => this.createCarDomain(car));
    return result;
  }

  public async findOne(id: string) {
    const carById = await this.model.findOne(id);
    const result = this.createCarDomain(carById);
    return result;
  }
}
