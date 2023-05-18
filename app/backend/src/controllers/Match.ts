import { Router } from 'express';
import { finishMatch, getAllMatches } from '../services/Match';
import tokenValidation from '../middlewares/TokenValidation';

const matchRoute = Router();

matchRoute.get('/', async (req, res) => {
  const { inProgress } = req.query;
  const allMatches = await getAllMatches(inProgress === 'true'
    || inProgress === 'false'
    ? JSON.parse(inProgress as string) : undefined);

  return res.status(200).json(allMatches);
});

matchRoute.put('/:id/finish', tokenValidation, async (req, res) => {
  const { id } = req.params;
  await finishMatch(Number(id));

  return res.status(200).json({ message: 'Finished' });
});

export default matchRoute;
