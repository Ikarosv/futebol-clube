import * as sinon from 'sinon';
import * as chai from 'chai';
import User from '../database/models/User';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { errorAllFieldsMustBeFilled, mockPostLoginWithoutEmail, mockPostLoginWithoutPassword, mockUser, mockṔostLogin, mockṔostUserResponse } from './mocks/Login.mock';

const request = chai.request;
chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /login', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(User, "findOne")
      .resolves({dataValues: mockUser} as User);
  });

  afterEach(sinon.restore)

  it('Testa se é possivel fazer login com sucesso', async () => {
    const res = await request(app).post('/login').send(mockṔostLogin);

    expect(res).to.be.a('object');
    expect(res).to.have.property('status');
    expect(res).to.have.status(200);
    expect(res).to.have.property('body');
    expect(res.body).to.have.property('token');
  });

  it('Testa se estiver faltando algum campo retorna com um status 400 e a mensagem: "All fields must be filled"', async () => {
    const res = await request(app).post('/login').send(mockPostLoginWithoutPassword);
    
    expect(res).to.be.a('object');
    expect(res).to.have.property('status');
    expect(res).to.have.status(400);
    expect(res).to.have.property('body');
    expect(res.body).to.be.deep.eq(errorAllFieldsMustBeFilled);
  });

  it('Testa caso a senha esteja errada se retorna com status 401 e a mensagem: "Invalid email or password"', async () => {
    process.env.JWT_SECRET = 'secret';
    const res = await request(app).post('/login').send({ ...mockṔostLogin, password: '1234567' });

    expect(res).to.be.a('object');
    expect(res).to.have.property('status');
    expect(res).to.have.status(401);
    expect(res).to.have.property('body');
    expect(res.body).to.be.deep.eq({ message: 'Invalid email or password' });
  })
});
