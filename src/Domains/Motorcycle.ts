import IMotorcycle from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

export default class Motorcycle extends Vehicle {
  private category: string;
  private engineCapacity: number;

  constructor(newBike: IMotorcycle) {
    super(newBike);
    this.category = newBike.category;
    this.engineCapacity = newBike.engineCapacity;
  }

  public getCategory() {
    return this.category;
  }

  public setCategory(newCategory: string) {
    this.category = newCategory;
  }

  public getEngineCapacity() {
    return this.engineCapacity;
  }

  public sewSeatsQty(newEngineCapacity: number) {
    this.engineCapacity = newEngineCapacity;
  }
}