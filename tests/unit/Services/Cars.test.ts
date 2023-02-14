import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import CarService from '../../../src/Services/CarService';
import CustomError from '../../../src/Error/CustomError';

describe('Ao tentar', function () {
  describe('cadastrar um carro', function () {
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

      sinon.restore();
    });
  });
  describe('acessar carros', function () {
    const allCarsMock = [
      {
        id: '634852326b35b59438fbea2f',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      },
      {
        id: '634852326b35b59438fbea31',
        model: 'Tempra',
        year: 1995,
        color: 'Black',
        buyValue: 39,
        doorsQty: 2,
        seatsQty: 5,
        status: false,
      },
    ];
    it('deve retornar todos os carros com sucesso', async function () {
      sinon.stub(Model, 'find').resolves(allCarsMock);
  
      const service = new CarService();
      const result = await service.findAll();
  
      expect(result).to.deep.equal(allCarsMock);

      sinon.restore();
    });

    it('deve retornar com sucesso quando passado id existente', async function () {
      sinon.stub(Model, 'findOne').resolves(allCarsMock[0]);
  
      const service = new CarService();
      const result = await service.findOne('634852326b35b59438fbea2f');
  
      expect(result).to.deep.equal(allCarsMock[0]);

      sinon.restore();
    });

    it('deve retornar com NOT FOUND quando passado id inexistente', async function () {
      sinon.stub(Model, 'findOne').resolves({});
  
      try {
        const service = new CarService();
        await service.findOne('634852326b35b59438fbea2f');
      } catch (error) {
        expect((error as Error).message).to.be.equal('Car not found');
        expect((error as CustomError).getStatus()).to.be.equal(404);
      }

      sinon.restore();
    });

    it('deve retornar com INVALID MONGO ID quando passado id inválido', async function () {
      try {
        const service = new CarService();
        await service.findOne('INVALID_MONGO_ID');
      } catch (error) {
        expect((error as CustomError).message).to.be.equal('Invalid mongo id');
        expect((error as CustomError).getStatus()).to.be.equal(422);
      }
    });
  });
  describe('atualizar informações de um carro', function () {
    it('deve retornar NOT FOUND se receber id inexistente', async function () {
      sinon.stub(Model, 'findOne').resolves({});
  
      try {
        const service = new CarService();
        await service.update('634852326b35b59438fbea2f');
      } catch (error) {
        expect((error as Error).message).to.be.equal('Car not found');
        expect((error as CustomError).getStatus()).to.be.equal(404);
      }

      sinon.restore();
    });
  });
});