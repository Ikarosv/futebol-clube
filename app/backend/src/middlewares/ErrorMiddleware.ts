import { NextFunction, Request, Response } from 'express';
import ValidationError from '../errors/ValidationError';
import NotFoundError from '../errors/NotFoundError';
import BadRequestError from '../errors/BadRequestError';

export default class ErrorMiddleware {
  static handleError(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ): Response | void {
    if (error instanceof NotFoundError) {
      return res.status(404).json({ message: error.message });
    }

    if (error instanceof ValidationError) {
      return res.status(error.status).json({ message: error.message });
    }

    if (error instanceof BadRequestError) {
      return res.status(401).json({ message: error.message });
    }

    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
