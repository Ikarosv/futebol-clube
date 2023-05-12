import { Router } from 'express';
import { getAllTeams } from '../services/Team';

const teamRouter = Router();

teamRouter.get('/', async (_req, res) => {
  try {
    const teams = await getAllTeams();
    return res.status(200).json(teams);
  } catch (error) {
    return res.status(500).json(error);
  }
});

export default teamRouter;
