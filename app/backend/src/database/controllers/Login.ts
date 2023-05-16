import { Router } from 'express';
import 'express-async-errors';
import LoginService from '../services/Login';

const loginRouter = Router();

loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const token = await LoginService.login(email, password);

  return res.status(200).json({ token });
});

export default loginRouter;
