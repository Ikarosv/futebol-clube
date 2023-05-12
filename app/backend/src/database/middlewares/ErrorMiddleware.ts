import { NextFunction, Request, Response } from 'express';
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

    return res.status(500).end();
  }
}
