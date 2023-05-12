import * as sinon from 'sinon';
import * as chai from 'chai';
import User from '../database/models/User';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { errorAllFieldsMustBeFilled, mockPostLoginWithoutEmail, mockPostLoginWithoutPassword, mockṔostLogin, mockṔostUserResponse } from './mocks/Login.mock';

const request = chai.request(app);
chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /login', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(mockṔostLogin as User);
  });

  after(sinon.restore)

  it('Testa se é possivel fazer login com sucesso e redireciona para a rota "/matches"', async () => {
    const res = await request.post('/login').send(mockṔostLogin);

    expect(res).to.be.a('object');
    expect(res).to.have.property('status');
    expect(res).to.have.status(200);
    expect(res).to.have.property('body');
    expect(res.body).to.be.deep.eq(mockṔostUserResponse);
    expect(res).to.redirect;
    expect(res).to.redirectTo('/matches');
  });

  it('Testa se estiver faltando algum campo retorna com um status 400 e a mensagem: "All fields must be filled"', async () => {
    const res = await request.post('/login').send(mockPostLoginWithoutEmail);

    expect(res).to.be.a('object');
    expect(res).to.have.property('status');
    expect(res).to.have.status(400);
    expect(res).to.have.property('body');
    expect(res.body).to.be.deep.eq(errorAllFieldsMustBeFilled);

    const res2 = await request.post('/login').send(mockPostLoginWithoutPassword);

    expect(res2).to.be.a('object');
    expect(res2).to.have.property('status');
    expect(res2).to.have.status(400);
    expect(res2).to.have.property('body');
    expect(res2.body).to.be.deep.eq(errorAllFieldsMustBeFilled);
  });
});
