import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import CustomError from '../../../src/Error/CustomError';

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
        model: 'Honda Cb 600f Spirit',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      },
      {
        id: '6348513f34c397abcad040b3',
        model: 'Honda Cb 600f Drifter',
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

    it('deve retornar com sucesso quando passado id existente', async function () {
      sinon.stub(Model, 'findOne').resolves(allMotorcyclesMock[0]);
  
      const service = new MotorcycleService();
      const result = await service.findOne('6348513f34c397abcad040b2');
  
      expect(result).to.deep.equal(allMotorcyclesMock[0]);

      sinon.restore();
    });

    it('deve retornar com NOT FOUND quando passado id inexistente', async function () {
      sinon.stub(Model, 'findOne').resolves({});
  
      try {
        const service = new MotorcycleService();
        await service.findOne('6348513f34c397abcad040b2');
      } catch (error) {
        expect((error as Error).message).to.be.equal('Car not found');
        expect((error as CustomError).getStatus()).to.be.equal(404);
      }

      sinon.restore();
    });
  });
});
