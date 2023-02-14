import IVehicle from '../Interfaces/IVehicle';

export default class Vehicle {
  protected id?: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status?: boolean | undefined;
  protected buyValue: number;

  constructor(newVehicle: IVehicle) {
    this.id = newVehicle.id;
    this.model = newVehicle.model;
    this.year = newVehicle.year;
    this.color = newVehicle.color;
    this.status = !!newVehicle.status;
    this.buyValue = newVehicle.buyValue;
  }
}