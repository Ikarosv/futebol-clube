import { NextFunction, Request, Response } from 'express';
import { decode, verify } from 'jsonwebtoken';
import ValidationError from '../../errors/ValidationError';
import User from '../../types/Users';

const JWT_SECRET = process.env.JWR_SECRET || 'secret';

export default async function tokenValidation(req: Request, res: Response, next: NextFunction) {
  const { authorization: token } = req.headers;

  if (!token) {
    throw new ValidationError('Token not found');
  }

  if (verify(token as string, JWT_SECRET)) {
    throw new ValidationError('Token must be a valid token');
  }

  const { user } = decode(token as string) as { user: User };

  if (!user) {
    throw new ValidationError('Token must be a valid token');
  }

  req.headers.user = JSON.stringify(user);

  return next();
}
