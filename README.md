# Projeto Car Shop :car: 

Projeto desenvolvido no curso de desenvolvimento web da Trybe, no módulo de Back-End.

### Tecnologias utilizadas 💻:
- API Rest com CRUD completo em TypeScript
- ODM Mongoose
- POO
- SOLID
- Docker
- Arquitetura DDD
- Mocha, Chai e Sinon, com abordagem TDD e BDD;

### Rodando localmente

Clone o repositório

```bash
  git clone git@github.com:miguel-inacio/projeto-car-shop.git
```

Entre no diretório do projeto

```bash
  cd projeto-car-shop
```

Suba os containers com o script do docker-compose

```bash
  docker-compose up-d
  docker exec -it car_shop
```

Instale as dependências

```bash
  npm install
```

Inicialize a aplicação

```bash
  npm run dev
```

Rode os testes

```bash
  npm run test:mocha
```

:heavy_exclamation_mark: A API ficará disponível no seu navegador no endereço <http://localhost:3001/>

### Documentação da API

<details>
  <summary> Rotas relacionadas à entidade Car </summary>
  

#####  POST /car
- Usada para cadastrar um carro no banco de dados.
- A requisição retorna o objeto enviado ao banco com seu novo e respectivo id.
  
<hr>


#####  GET /car
- Usada para retornar todos os carros dentro do banco de dados.
  
<hr>
  

#####  GET /car/${id}
- Usada para retornar o carro equivalente ao id passado.
  
<hr>
  
#####  PUT /car/${id}
- Usada para atualizar o carro equivalente ao id passado.
- Retorna o carro atualizado.
  
<hr>
  
#####  DELETE /car/${id}
- Usada para excluir do banco de dados o carro equivalente ao id passado.
- Retorna status de sucesso.
  
</details>

<details>
  <summary> Rotas relacionadas à entidade Motorcycle </summary>

#####  POST /motorcycle
- Usada para cadastrar uma moto no banco de dados.
- A requisição retorna o objeto enviado ao banco com seu novo e respectivo id.
  
<hr>


#####  GET /motorcycle
- Usada para retornar todas as motos dentro do banco de dados.
  
<hr>
  

#####  GET /motorcycle/${id}
- Usada para retornar a moto equivalente ao id passado.
  
<hr>
  
#####  PUT /motorcycle/${id}
- Usada para atualizar a moto equivalente ao id passado.
- Retorna a moto atualizada.
  
<hr>
  
#####  DELETE /motorcycle/${id}
- Usada para excluir do banco de dados a moto equivalente ao id passado.
- Retorna status de sucesso.

</details>
