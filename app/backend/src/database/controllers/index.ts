import loginRouter from './Login';
import teamRouter from './Team';

export default [
  { path: '/teams', router: teamRouter },
  { path: '/login', router: loginRouter },
];
