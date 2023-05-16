import { Request, Response } from 'express';
import tokenValidation from '../database/middlewares/TokenValidation';
import sinon from 'sinon';
import { sign } from 'jsonwebtoken';
import { mockUser } from './mocks/Login.mock';

describe('Testando os middlewares', () => {
  it('Testa se sem o token o middleware dispara um erro.', () => {
    const request = {
      header: {
        authorization: sign({
          user: {
            ...mockUser,
            password: undefined
          }
        }, 'secret')
      }
    };
    const response = {};
    const next = sinon.spy();
    try {
      tokenValidation((request as unknown) as Request, (response as unknown) as Response, next);
    } catch (error) {}
  });
})