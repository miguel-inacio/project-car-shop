import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import CustomError from '../../../src/Error/CustomError';

describe('Ao tentar', function () {
  const MOTORCYCLE_NOT_FOUND = 'Motorcycle not found';
  const INVALID_MONGO_ID = 'Invalid mongo id';

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
        expect((error as Error).message).to.be.equal(MOTORCYCLE_NOT_FOUND);
        expect((error as CustomError).getStatus()).to.be.equal(404);
      }

      sinon.restore();
    });

    it('deve retornar com INVALID MONGO ID quando passado id inválido', async function () {
      try {
        const service = new MotorcycleService();
        await service.findOne('INVALID_MONGO_ID');
      } catch (error) {
        expect((error as CustomError).message).to.be.equal(INVALID_MONGO_ID);
        expect((error as CustomError).getStatus()).to.be.equal(422);
      }
    });
  });
  describe('atualizar informações de uma moto', function () {
    const motoMock = {
      id: '6348513f34c397abcad040b2',
      model: 'Honda Cb 600f V6',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };

    const motorcycleUpdateRequestMock = {
      model: 'Honda Cb 600f CW',
      year: 2023,
      color: 'Black',
      status: false,
      buyValue: 60.000,
      category: 'Motocross',
      engineCapacity: 100,
    };

    it('deve retornar com sucesso se receber id válido', async function () {
      sinon.stub(Model, 'findOne').resolves(motoMock);
      sinon.stub(Model, 'updateOne').resolves();

      const service = new MotorcycleService();
      const result = await service.update('634852326b35b59438fbea2f', motorcycleUpdateRequestMock);

      expect(result).to.deep.equal(
        { id: '634852326b35b59438fbea2f', ...motorcycleUpdateRequestMock },
      );

      sinon.restore();
    });

    it('deve retornar NOT FOUND se receber id inexistente', async function () {
      sinon.stub(Model, 'findOne').resolves({});
  
      try {
        const service = new MotorcycleService();
        await service.update('634852326b35b59438fbea2f', motorcycleUpdateRequestMock);
      } catch (error) {
        expect((error as Error).message).to.be.equal(MOTORCYCLE_NOT_FOUND);
        expect((error as CustomError).getStatus()).to.be.equal(404);
      }

      sinon.restore();
    });

    it('deve retornar INVALID MONGO ID se receber id inválido', async function () {
      try {
        const service = new MotorcycleService();
        await service.update('INVALID_MONGO_ID', motorcycleUpdateRequestMock);
      } catch (error) {
        expect((error as CustomError).message).to.be.equal(INVALID_MONGO_ID);
        expect((error as CustomError).getStatus()).to.be.equal(422);
      }
    });
  });
  describe('deletar uma moto com sucesso', function () {
    it('com sucesso, deve retornar status 404', async function () {
      sinon.stub(Model, 'deleteOne').resolves();
      sinon.stub(Model, 'findOne').resolves({});

      try {
        const service = new MotorcycleService();
        await service.delete('634852326b35b59438fbea2f');
        await service.findOne('634852326b35b59438fbea2f');
      } catch (error) {
        expect((error as Error).message).to.be.equal(MOTORCYCLE_NOT_FOUND);
        expect((error as CustomError).getStatus()).to.be.equal(404);
      }

      sinon.restore();
    });
  });

  describe('deletar uma moto sem sucesso', function () {
    it('deve retornar NOT FOUND se receber id inexistente', async function () {
      sinon.stub(Model, 'findOne').resolves({});
  
      try {
        const service = new MotorcycleService();
        await service.delete('634852326b35b59438fbea2f');
      } catch (error) {
        expect((error as Error).message).to.be.equal(MOTORCYCLE_NOT_FOUND);
        expect((error as CustomError).getStatus()).to.be.equal(404);
      }

      sinon.restore();
    });

    it('deve retornar INVALID MONGO ID se receber id inválido', async function () {
      try {
        const service = new MotorcycleService();
        await service.delete('INVALID_MONGO_ID');
      } catch (error) {
        expect((error as CustomError).message).to.be.equal(INVALID_MONGO_ID);
        expect((error as CustomError).getStatus()).to.be.equal(422);
      }
    });
  });
});
