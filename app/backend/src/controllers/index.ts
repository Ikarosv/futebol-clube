import leaderboardRouter from './Leaderboard';
import loginRouter from './Login';
import matchRoute from './Match';
import teamRouter from './Team';

export default [
  { path: '/teams', router: teamRouter },
  { path: '/login', router: loginRouter },
  { path: '/matches', router: matchRoute },
  { path: '/leaderboard', router: leaderboardRouter },
];
