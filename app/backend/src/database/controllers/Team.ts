import { Router } from 'express';
import { getAllTeams, getTeamById } from '../services/Team';
import 'express-async-errors';

const teamRouter = Router();

teamRouter.get('/', async (_req, res) => {
  try {
    const teams = await getAllTeams();
    return res.status(200).json(teams);
  } catch (error) {
    return res.status(500).json(error);
  }
});

teamRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const team = await getTeamById(Number(id));

  return res.status(200).json(team);
});

export default teamRouter;
