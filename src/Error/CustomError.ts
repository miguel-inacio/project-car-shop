export default class CustomError extends Error {
  private _status: number;
  private _type: string;
  
  constructor(message: string, status: number, type: string) {
    super(message);
    this._status = status;
    this._type = type;
  }
  public getStatus() : number {
    return this._status;
  }

  public getType() : string {
    return this._type;
  }
}