import { Router } from 'express';
import { getAllMatches } from '../services/Match';

const matchRoute = Router();

matchRoute.get('/', async (req, res) => {
  const allMatches = await getAllMatches();

  return res.status(200).json(allMatches);
});

export default matchRoute;
