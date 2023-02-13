import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import CarService from '../../../src/Services/CarService';

describe('Ao tentar cadastrar um carro', function () {
  it('deve retornar informações do carro cadastrado', async function () {
    const carResultMock = {
      id: '6348513f34c397abcad040b2',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };

    const carInputMock = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };

    sinon.stub(Model, 'create').resolves(carResultMock);

    const service = new CarService();
    const result = await service.register(carInputMock);

    expect(result).to.deep.equal(carResultMock);
  });
});