import IVehicle from './IVehicle';

export default interface IMotorcyle extends IVehicle {
  category: string,
  engineCapacity: number,
}