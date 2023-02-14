export default class CustomError extends Error {
  private _status: number;
  constructor(message: string, status: number) {
    super(message);
    this._status = status;
  }
  public getStatus() : number {
    return this._status;
  }
}