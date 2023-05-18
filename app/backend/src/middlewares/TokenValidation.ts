import { NextFunction, Request, Response } from 'express';
import { decode, verify } from 'jsonwebtoken';
import ValidationError from '../errors/ValidationError';
import User from '../types/Users';
import 'express-async-errors';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

export default async function tokenValidation(req: Request, res: Response, next: NextFunction) {
  const { authorization: token } = req.headers;

  if (!token) {
    throw new ValidationError('Token not found', 401);
  }

  try {
    verify(token, JWT_SECRET);
  } catch (error) {
    throw new ValidationError('Token must be a valid token', 401);
  }

  const user = decode(token) as User;

  req.headers.user = JSON.stringify(user);

  return next();
}
