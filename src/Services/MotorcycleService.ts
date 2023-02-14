import Motorcycle from '../Domains/Motorcycle';
import CustomError from '../Error/CustomError';
import IMotorcyle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

export default class MotorcycleService {
  public model = new MotorcycleODM();
  public validation = 'motorcycle validation';

  public createMotorcycleDomain(motorcycle: Omit <IMotorcyle, 'id'> | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public async register(motorcycle: Omit <IMotorcyle, 'id'>) : Promise<Motorcycle | null> {
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
    const validId = this.validateMongoId(id);
    if (validId) {
      const motorcycleById = await this.model.findOne(id);
      if (motorcycleById === null || !motorcycleById.id) {
        throw new CustomError('Motorcycle not found', 404, this.validation);
      } else {
        const result = this.createMotorcycleDomain(motorcycleById);
        return result;
      }
    }
  }

  public async update(id: string, newData: IMotorcyle) : Promise<Motorcycle | unknown> {
    await this.model.update(id, newData);
    return this.createMotorcycleDomain({ id, ...newData });
  }

  public async delete(id: string) : Promise<void> {
    const motorcycleExists = await this.findOne(id);
    const validId = this.validateMongoId(id);
    if (motorcycleExists && validId) await this.model.delete(id);
  }
}