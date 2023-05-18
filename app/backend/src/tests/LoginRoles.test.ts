import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { mockUser, mockṔostUserResponse, mockṔostLogin, mockṔostEncrypted } from './mocks/Login.mock';
import { sign } from 'jsonwebtoken';
import UserInterface from '../types/Users';
import User from '../database/models/User';
// import { errorAllFieldsMustBeFilled, mockPostLoginWithoutEmail, mockPostLoginWithoutPassword, mockUser, mockṔostLogin, mockṔostUserResponse } from './mocks/Login.mock';

chai.use(chaiHttp);
const { request, expect } = chai;

describe('Testando os middlewares', () => {
  afterEach(sinon.restore);
  it('Testa se sem o token o middleware dispara um erro.', async () => {
    const res = await request(app).get('/login/role');

    expect(res).to.be.a('object');
    expect(res).to.have.property('status');
    expect(res).to.have.status(401);
    expect(res).to.have.property('body');
    expect(res.body).to.be.deep.eq({ message: 'Token not found' });
  });

  it('Testa se tiver um token invalido o middleware dispara um erro.', async () => {
    const res = await request(app).get('/login/role').set('authorization', 'tokenInvalido');

    expect(res).to.be.a('object');
    expect(res).to.have.property('status');
    expect(res).to.have.status(401);
    expect(res).to.have.property('body');
    expect(res.body).to.be.deep.eq({ message: 'Token must be a valid token' });
  });

  it('Testa se é possível ter acesso ao role do atual usuario', async () => {
    sinon.stub(User, "findOne").resolves({ dataValues: {...mockṔostEncrypted, role: mockUser.role} } as User);
    const responseLogin = await request(app).post('/login').send(mockṔostLogin);
console.log('bbbb', responseLogin.body);

    const res = await request(app)
      .get('/login/role')
      .set('authorization', responseLogin.body.token);
      console.log(res.body);
      
    
    expect(res).to.be.a('object');
    expect(res).to.have.property('status');
    expect(res).to.have.status(200);
    expect(res).to.have.property('body');
    expect(res.body).to.be.deep.eq({ role: mockUser.role });
  });
})