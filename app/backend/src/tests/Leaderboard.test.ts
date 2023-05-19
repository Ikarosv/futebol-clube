import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/Match';
import { matchMock } from './mocks/Match.mock';
import { MatchesLeaderboard, extractLeaderboardHome } from '../services/Leaderboard';

chai.use(chaiHttp);

const { expect, request } = chai;

const expectedReturn = extractLeaderboardHome((matchMock as unknown) as MatchesLeaderboard[]);

describe('Testando a rota /leaderboard', () => {

  beforeEach(async () => {
    sinon
      .stub(Matches, 'findAll')
      .resolves((matchMock as unknown) as Matches[])
  });
  afterEach(sinon.restore);

  it('Testa se ao fazer requisição para a rota /leaderboard/home trás os dados esperados', async () => {
    request(app)
      .get('/leaderboard/home')
      .end((_err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.have.property('name');
        expect(res.body[0]).to.have.property('totalPoints');
        expect(res.body[0]).to.have.property('totalGames');
        expect(res.body[0]).to.have.property('totalDraws');
        expect(res.body[0]).to.have.property('totalVictories');
        expect(res.body[0]).to.have.property('goalsFavor');
        expect(res.body[0]).to.have.property('goalsOwn');
        expect(res.body[0]).to.have.property('goalsBalance');
        expect(res.body[0]).to.have.property('efficiency');
        expect(res.body).to.be.deep.equal(expectedReturn);
      });
  });
});
