import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import CarService from '../../../src/Services/CarService';

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
    it('deve retornar todos os carros com sucesso', async function () {
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
        },
      ];

      sinon.stub(Model, 'find').resolves(allCarsMock);
  
      const service = new CarService();
      const result = await service.findAll();
  
      expect(result).to.deep.equal(allCarsMock);

      sinon.restore();
    });
  });
});