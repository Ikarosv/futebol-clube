import { NextFunction, Request, Response } from 'express';
import ValidationError from '../../errors/ValidationError';
import NotFoundError from '../../errors/NotFoundError';

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
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).end();
  }
}
