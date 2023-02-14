import Motorcycle from '../Domains/Motorcycle';
import IMotorcyle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

export default class MotorcycleService {
  public model = new MotorcycleODM();
  public validation = 'car validation';

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
}
