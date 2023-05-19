import { Router } from 'express';
import { getLeaderboardHome } from '../services/Leaderboard';

const leaderboardRouter = Router();

leaderboardRouter.get('/home', async (req, res) => {
  const leaderboard = await getLeaderboardHome();

  return res.status(200).json(leaderboard);
});

export default leaderboardRouter;
