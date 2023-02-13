import ICar from '../Interfaces/ICar';

export default class Car implements ICar {
  readonly id: string | undefined;
  readonly model: string;
  readonly year: number;
  readonly color: string;
  readonly status?: boolean | undefined;
  readonly buyValue: number;
  readonly doorsQty: number;
  readonly seatsQty: number;

  constructor(newCar: Omit <ICar, 'id'>) {
    this.model = newCar.model;
    this.year = newCar.year;
    this.color = newCar.color;
    this.status = newCar.status;
    this.buyValue = newCar.buyValue;
    this.doorsQty = newCar.doorsQty;
    this.seatsQty = newCar.seatsQty;
  }
}
