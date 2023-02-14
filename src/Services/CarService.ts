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

  public validateMongoId(id: string) : boolean {
    const isIdValid = this.model.validateMongoId(id);
    if (!isIdValid) throw new CustomError('Invalid mongo id', 422, this.validation);
    else return isIdValid;
  }

  public async findOne(id: string) : Promise<Car | null | unknown> {
    const validId = this.validateMongoId(id);
    if (validId) {
      const carById = await this.model.findOne(id);
      if (carById === null || !carById.id) {
        throw new CustomError('Car not found', 404, this.validation);
      } else {
        const result = this.createCarDomain(carById);
        return result;
      }
    }
  }

  public async update(id: string, newData: ICar) : Promise<Car | unknown> {
    const validId = this.validateMongoId(id);
    const carExists = await this.findOne(id);
    if (validId && carExists) {
      await this.model.update(id, newData);
      return this.createCarDomain({ id, ...newData });
    }
  }

  public async delete(id: string) : Promise<void> {
    const carExists = await this.findOne(id);
    const validId = this.validateMongoId(id);
    if (carExists && validId) await this.model.delete(id);
  }
}
