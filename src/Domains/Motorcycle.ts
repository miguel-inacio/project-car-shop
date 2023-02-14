import IMotorcycle from '../Interfaces/IMotorcycle';

export default class Motorcycle {
  protected id?: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status?: boolean;
  protected buyValue: number;
  private category: string;
  private engineCapacity: number;

  constructor(newBike: IMotorcycle) {
    this.id = newBike.id;
    this.model = newBike.model;
    this.year = newBike.year;
    this.color = newBike.color;
    this.status = !!newBike.status;
    this.buyValue = newBike.buyValue;
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