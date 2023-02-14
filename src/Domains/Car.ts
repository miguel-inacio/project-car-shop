import ICar from '../Interfaces/ICar';
import Vehicle from './Vehicle';

export default class Car extends Vehicle {
  private doorsQty: number;
  private seatsQty: number;

  constructor(newCar: ICar) {
    super(newCar);
    this.doorsQty = newCar.doorsQty;
    this.seatsQty = newCar.seatsQty;
  }

  public getDoorsQty() {
    return this.doorsQty;
  }

  public setDoorsQty(newdoorsQty: number) {
    this.doorsQty = newdoorsQty;
  }

  public getSeatsQty() {
    return this.seatsQty;
  }

  public sewSeatsQty(newSeatsQty: number) {
    this.doorsQty = newSeatsQty;
  }
}
