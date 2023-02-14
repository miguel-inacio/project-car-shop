import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import MotorcycleService from '../../../src/Services/MotorcycleService';
// import CustomError from '../../../src/Error/CustomError';

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
  describe('acessar motos', function () {
    const allMotorcyclesMock = [
      {
        id: '6348513f34c397abcad040b2',
        model: 'Honda Cb 600f Hornet',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      },
      {
        id: '6348513f34c397abcad040b3',
        model: 'Honda Cb 600f Hornet',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      },
    ];
    it('deve retornar todas as motos com sucesso', async function () {
      sinon.stub(Model, 'find').resolves(allMotorcyclesMock);
  
      const service = new MotorcycleService();
      const result = await service.findAll();
  
      expect(result).to.deep.equal(allMotorcyclesMock);

      sinon.restore();
    });
  });
});
