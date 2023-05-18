import { Router } from 'express';
import { getAllMatches } from '../services/Match';

const matchRoute = Router();

matchRoute.get('/', async (req, res) => {
  const { inProgress } = req.query;
  const allMatches = await getAllMatches(inProgress === 'true'
    || inProgress === 'false'
    ? JSON.parse(inProgress as string) : undefined);

  return res.status(200).json(allMatches);
});

export default matchRoute;
