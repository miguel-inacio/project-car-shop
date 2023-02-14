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

  public async findOne(id: string) : Promise<Motorcycle | null | unknown> {
    const motorcycleById = await this.model.findOne(id);
    if (motorcycleById === null || !motorcycleById.id) {
      throw new CustomError('Motorcycle not found', 404, this.validation);
    } else {
      const result = this.createMotorcycleDomain(motorcycleById);
      return result;
    }
  }
}
