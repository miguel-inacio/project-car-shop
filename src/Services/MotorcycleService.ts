import Motorcycle from '../Domains/Motorcycle';
import CustomError from '../Error/CustomError';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

export default class MotorcycleService {
  public model = new MotorcycleODM();
  public validation = 'motorcycle validation';

  public createMotorcycleDomain(motorcycle: Omit <IMotorcycle, 'id'> | null): Motorcycle | null {
    if (!motorcycle || motorcycle.color === null || motorcycle.color === undefined) {
      return null;
    }
    return new Motorcycle(motorcycle);
  }

  public async register(motorcycle: Omit <IMotorcycle, 'id'>) : Promise<Motorcycle | null> {
    const newMotorcycle = await this.model.create(motorcycle);
    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async findAll() : Promise<(Motorcycle | null)[]> {
    const allMotorcycles = await this.model.findAll();
    const result = allMotorcycles.map((motorcycle) => this.createMotorcycleDomain(motorcycle));
    return result;
  }

  public validateMongoId(id: string) : boolean {
    const isIdValid = this.model.validateMongoId(id);
    if (!isIdValid) throw new CustomError('Invalid mongo id', 422, this.validation);
    else return isIdValid;
  }

  public async findOne(id: string) : Promise<Motorcycle | null | unknown> {
    this.validateMongoId(id);
    const motorcycleById = await this.model.findOne(id);
    if (motorcycleById === null || !motorcycleById.id) {
      throw new CustomError('Motorcycle not found', 404, this.validation);
    }
    const result = this.createMotorcycleDomain(motorcycleById);
    return result;
  }

  public async update(id: string, newData: IMotorcycle) : Promise<Motorcycle | null | undefined> {
    this.validateMongoId(id);
    await this.findOne(id);
    
    await this.model.update(id, newData);
    return this.createMotorcycleDomain({ id, ...newData });
  }

  public async delete(id: string) : Promise<IMotorcycle | null> {
    this.validateMongoId(id);
    const result = await this.model.delete(id);
    if (!result) {
      throw new CustomError('Motorcycle not found', 404, this.validation);
    }
    return result;
  }
}