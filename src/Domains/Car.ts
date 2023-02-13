import ICar from '../Interfaces/ICar';

export default class Car {
  protected id?: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status?: boolean | undefined;
  protected buyValue: number;
  private doorsQty: number;
  private seatsQty: number;

  constructor(newCar: ICar) {
    this.id = newCar.id;
    this.model = newCar.model;
    this.year = newCar.year;
    this.color = newCar.color;
    this.status = !!newCar.status;
    this.buyValue = newCar.buyValue;
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
