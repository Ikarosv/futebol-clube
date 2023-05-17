import { Router } from 'express';
import 'express-async-errors';
import LoginService from '../services/Login';
import tokenValidation from '../middlewares/TokenValidation';
import UserInterface from '../types/Users';

const loginRouter = Router();

loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const token = await LoginService.login(email, password);

  return res.status(200).json({ token });
});

loginRouter.get('/role', tokenValidation, async (req, res) => {
  const { user } = req.headers;

  const userRole = (JSON.parse(user as string) as { user: UserInterface }).user.role;

  return res.status(200).json({ role: userRole });
});

export default loginRouter;
