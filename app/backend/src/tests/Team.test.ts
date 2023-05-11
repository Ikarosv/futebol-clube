import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/Team';

import { Response } from 'superagent';
import { mockGetTeam } from './mocks/Team.mock';
const { request } = chai;
chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
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

  describe('Testando a controller', () => {
    afterEach(sinon.restore);

    it('Testa se um GET na rota "/teams" retorna todos os times', async () => {
      sinon
      .stub(TeamModel, "findAll")
      .resolves(mockGetTeam as TeamModel[]);

      expect(false).to.be.eq(true);
      const r = await request(app).get('/teams');

      expect(r).to.be.a('object');
      expect(r).to.have.property('status');
      expect(r).to.have.property('body');
      expect(r.body).to.be.deep.eq(mockGetTeam);
    });
  });
});
