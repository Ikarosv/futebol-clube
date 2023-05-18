import { NextFunction, Request, Response } from 'express';
import { searchTeams } from '../services/Team';
import ValidationError from '../errors/ValidationError';
import NotFoundError from '../errors/NotFoundError';

export default async function teamValidation(req: Request, res: Response, next: NextFunction) {
  const { homeTeamId, awayTeamId }: { homeTeamId: number, awayTeamId: number } = req.body;

  if (homeTeamId === awayTeamId) {
    throw new ValidationError('It is not possible to create a match with two equal teams', 422);
  }

  const teams = await searchTeams([homeTeamId, awayTeamId]);

  if (teams.length !== 2) {
    throw new NotFoundError('There is no team with such id!');
  }

  next();
}
