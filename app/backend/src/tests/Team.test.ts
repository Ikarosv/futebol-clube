import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/Team';

import { Response } from 'superagent';
import { mockGetTeam, mockGetTeamById } from './mocks/Team.mock';
const { request } = chai;
chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota /teams', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(TeamModel, "findAll")
  //     .resolves(mockGetTeam as TeamModel[]);
  // });

  // after(()=>{
  //   (TeamModel.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  afterEach(sinon.restore);

  it('Testa se um GET na rota "/teams" retorna todos os times', async () => {
    sinon
    .stub(TeamModel, "findAll")
    .resolves(mockGetTeam as TeamModel[]);

    const teams = await request(app).get('/teams');
    
    expect(teams).to.have.status(200);

    expect(teams).to.be.a('object');
    expect(teams).to.have.property('status');
    expect(teams).to.have.property('body');
    expect(teams.body).to.be.deep.eq(mockGetTeam);
  });
  it('Testa se algo der errado na service ou model o controller envia erro 500', async () => {
    sinon
    .stub(TeamModel, "findAll")
    .throws();

    const responseError = await request(app).get('/teams');
    
    expect(responseError).to.have.status(500);
  });

  it('Testa se um GET na rota "/teams/:id" retorna o time com o id passado', async () => {
    sinon
    .stub(TeamModel, "findOne")
    .resolves(mockGetTeamById as TeamModel);

    const team = await request(app).get('/teams/2');
    
    expect(team).to.have.status(200);

    expect(team).to.be.a('object');
    expect(team).to.have.property('status');
    expect(team).to.have.property('body');
    expect(team.body).to.be.deep.eq(mockGetTeamById);
  });

  it('Testa se um GET na rota "/teams/:id" retorna erro 404 se o time não existir', async () => {
    sinon
    .stub(TeamModel, "findOne")
    .resolves(null);

    const team = await request(app).get('/teams/2');
    
    expect(team).to.have.status(404);
    expect(team.body).to.be.deep.eq({ message: 'Time não encontrado' });
  });
});
