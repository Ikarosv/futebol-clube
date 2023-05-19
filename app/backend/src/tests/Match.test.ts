import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { mockṔostLogin } from './mocks/Login.mock';
import { app } from '../app';
import Matches from '../database/models/Match';
import User from '../database/models/User';
import Team from '../database/models/Team';
import { matchMock, matchMockEqual, matchMockInProgress, matchMockNotInProgress } from './mocks/Match.mock';
import { mockUser } from './mocks/Login.mock';
import { sign } from 'jsonwebtoken';
import UserInterface from '../types/Users';

chai.use(chaiHttp);

const { expect, request } = chai;

describe('Testa a rota /matches', async () => {
  const userMock: UserInterface = { ...mockUser };
  delete userMock.password;
  const token = sign({ user: { ...mockUser } }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });

  afterEach(sinon.restore);

  it('Testa se é possivel pegar todos os matches.', async () => {
    sinon.stub(Matches, 'findAll').resolves((matchMock as unknown) as Matches[]);
    const matches = await request(app).get('/matches');

    expect(matches).to.be.a('object');
    expect(matches).to.have.property('status');
    expect(matches).to.have.status(200);
    expect(matches).to.have.property('body');
    expect(matches.body).to.be.deep.eq(matchMock);    
  });

  it('Testa se é possivel pegar todos os matches que estão em andamento.', async () => {
    sinon.stub(Matches, 'findAll').resolves((matchMockInProgress as unknown) as Matches[]);
    const matches = await request(app).get('/matches?inProgress=true');

    expect(matches).to.be.a('object');
    expect(matches).to.have.property('status');
    expect(matches).to.have.status(200);
    expect(matches).to.have.property('body');
    expect(matches.body).to.be.deep.eq(matchMockInProgress);    
  });

  it('Testa se é possivel pegar todos os matches que NÃO estão em andamento.', async () => {
    sinon.stub(Matches, 'findAll').resolves((matchMockNotInProgress as unknown) as Matches[]);
    const matches = await request(app).get('/matches?inProgress=false');

    expect(matches).to.be.a('object');
    expect(matches).to.have.property('status');
    expect(matches).to.have.status(200);
    expect(matches).to.have.property('body');
    expect(matches.body).to.be.deep.eq(matchMockNotInProgress);    
  });

  it('Testa se é possível atualizar uma partida em andamento.', async () => {
    sinon.stub(Matches, 'update')
    .callsFake(async (
      { homeTeamGoals, awayTeamGoals },
      { where }: { where: any }) => {
        expect(homeTeamGoals).to.be.eq(3);
        expect(awayTeamGoals).to.be.eq(1);
        expect(where.id).to.be.eq(1);
        return [1]
    });

    console.log(token);

    const matches = await request(app)
      .patch('/matches/1')
      .set('Authorization', token)
      .send({
        "homeTeamGoals": 3,
        "awayTeamGoals": 1
      });
    
    expect(matches).to.be.a('object');
    expect(matches).to.have.property('status');
    expect(matches).to.have.status(200);
  });

  it('Testa se é possível finalizar uma partida.', async () => {
    sinon
      .stub(Matches, "update")
      .resolves([1]);

    // sinon
    //   .stub(User, "findOne")
    //   .resolves({dataValues: mockUser} as User);
    // const { body: { token } } = await request(app).post('/login').send(mockṔostLogin);

    const res = await request(app)
      .patch('/matches/1/finish')
      .set('Authorization', token);

    expect(res).to.be.a('object');
    expect(res).to.have.property('status');
    expect(res).to.have.status(200);
    expect(res).to.have.property('body');
    expect(res.body).to.be.deep.eq({ message: 'Finished' });
  });

  it('Testa se caso não tenha linhas afetas dispara um erro.', async () => {
    sinon
      .stub(Matches, "update")
      .resolves([0]);
    
    // sinon
    //   .stub(User, "findOne")
    //   .resolves({dataValues: mockUser} as User);
    // const { body: { token } } = await request(app).post('/login').send(mockṔostLogin);

    const res = await request(app)
      .patch('/matches/1/finish')
      .set('Authorization', token);

    expect(res).to.be.a('object');
    expect(res).to.have.property('status');
    expect(res).to.have.status(404);
    expect(res).to.have.property('body');
    expect(res.body).to.be.deep.eq({ message: 'Match not found' });
  });

  it('Testa se é possível criar uma partida.', async () => {
    sinon
      .stub(Matches, "create")
      .resolves((matchMock[0] as unknown) as Matches);

    // sinon
    //   .stub(User, "findOne")
    //   .resolves({dataValues: mockUser} as User);
    // const { body: { token } } = await request(app).post('/login').send(mockṔostLogin);

    const res = await request(app).post('/matches')
      .send(matchMock[0])
      .set('Authorization', token);

    expect(res).to.be.a('object');
    expect(res).to.have.property('status');
    expect(res).to.have.status(201);
    expect(res).to.have.property('body');
    expect(res.body).to.be.deep.eq(matchMock[0]);
  });

  it('Testa se NÃO é possível cria uma partida com dois times com o mesmo id.', async () => {
    // sinon
    //   .stub(User, "findOne")
    //   .resolves({dataValues: mockUser} as User);
    // const { body: { token } } = await request(app).post('/login').send(mockṔostLogin);

    const res = await request(app).post('/matches')
      .send(matchMockEqual)
      .set('Authorization', token);

    expect(res).to.be.a('object');
    expect(res).to.have.property('status');
    expect(res).to.have.status(422);
    expect(res).to.have.property('body');
    expect(res.body).to.be.deep.eq({ message: 'It is not possible to create a match with two equal teams' });
  });

  it('Testa se NÃO é possível cria uma partida com dois times com o id inexistente.', async () => {
    // sinon
    //   .stub(User, "findOne")
    //   .resolves({dataValues: mockUser} as User);
    // const { body: { token } } = await request(app).post('/login').send(mockṔostLogin);

    sinon
      .stub(Team, "findAll")
      .resolves([]);
    const res = await request(app).post('/matches')
      .send({...matchMockEqual, homeTeamId: 999, awayTeamId: 998})
      .set('Authorization', token);

    expect(res).to.be.a('object');
    expect(res).to.have.property('status');
    expect(res).to.have.status(404);
    expect(res).to.have.property('body');
    expect(res.body).to.be.deep.eq({ 'message': 'There is no team with such id!' });
  });
});
