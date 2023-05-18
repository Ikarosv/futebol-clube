import { Router } from 'express';
import { createMatch, finishMatch, getAllMatches, updateMatch } from '../services/Match';
import tokenValidation from '../middlewares/TokenValidation';
import teamValidation from '../middlewares/TeamValidation';

const matchRoute = Router();

matchRoute.get('/', async (req, res) => {
  const { inProgress } = req.query;
  const allMatches = await getAllMatches(inProgress === 'true'
    || inProgress === 'false'
    ? JSON.parse(inProgress as string) : undefined);

  return res.status(200).json(allMatches);
});

matchRoute.patch('/:id', tokenValidation, async (req, res) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;
  await updateMatch(Number(id), homeTeamGoals, awayTeamGoals);

  return res.status(200).json({ message: 'Updated' });
});

matchRoute.patch('/:id/finish', tokenValidation, async (req, res) => {
  const { id } = req.params;
  await finishMatch(Number(id));

  return res.status(200).json({ message: 'Finished' });
});

matchRoute.post('/', tokenValidation, teamValidation, async (req, res) => {
  const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
  const match = await createMatch(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);

  return res.status(201).json(match);
});

export default matchRoute;
