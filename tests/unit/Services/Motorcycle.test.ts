import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('Ao tentar', function () {
  describe('cadastrar uma moto', function () {
    it('deve retornar informações da moto cadastrada', async function () {
      const bikeResultMock = {
        id: '6348513f34c397abcad040b2',
        model: 'Honda Cb 600f Hornet',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      };
  
      const bikeInputMock = {
        model: 'Honda Cb 600f Hornet',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      };
  
      sinon.stub(Model, 'create').resolves(bikeResultMock);
  
      const service = new MotorcycleService();
      const result = await service.register(bikeInputMock);
  
      expect(result).to.deep.equal(bikeResultMock);

      sinon.restore();
    });
  });
});
