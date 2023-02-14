import { isValidObjectId, model, Model, models,
  Schema, UpdateQuery, UpdateWriteOpResult } from 'mongoose';

abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public async create(obj: T): Promise<T> {
    const newCar = await this.model.create({ ...obj });
    return newCar;
  }

  public async findAll() : Promise<T[]> {
    const allCars = await this.model.find();
    return allCars;
  }

  public validateMongoId(id: string) : boolean {
    return isValidObjectId(id);
  }

  public async findOne(id: string) : Promise<T | null > {
    const result = await this.model.findById(id);
    return result;
  }

  public async update(id: string, obj: UpdateQuery<T>) : Promise<UpdateWriteOpResult> {
    const result = await this.model.updateOne({ id }, { $set: { ...obj } });
    return result;
  }
}

export default AbstractODM;