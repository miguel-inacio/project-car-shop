import Car from '../Domains/Car';
import CustomError from '../Error/CustomError';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

export default class CarService {
  public model = new CarODM();
  public validation = 'car validation';

  public createCarDomain(car: Omit <ICar, 'id'> | null): Car | null {
    if (!car || car.color === null || car.color === undefined) {
      return null;
    }
    return new Car(car);
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

  public validateMongoId(id: string) : boolean {
    const isIdValid = this.model.validateMongoId(id);
    if (!isIdValid) throw new CustomError('Invalid mongo id', 422, this.validation);
    else return isIdValid;
  }

  public async findOne(id: string) : Promise<Car | null | unknown> {
    this.validateMongoId(id);
    
    const carById = await this.model.findOne(id);
    if (carById === null || !carById.id) {
      throw new CustomError('Car not found', 404, this.validation);
    }
    const result = this.createCarDomain(carById);
    return result;
  }

  public async update(id: string, newData: ICar) : Promise<Car | unknown> {
    this.validateMongoId(id);
    await this.findOne(id);
    
    await this.model.update(id, newData);
    return this.createCarDomain({ id, ...newData });
  }

  public async delete(id: string) : Promise<ICar | null> {
    this.validateMongoId(id);
    const result = await this.model.delete(id);
    if (!result) {
      throw new CustomError('Car not found', 404, this.validation);
    }
    return result;
  }
}
