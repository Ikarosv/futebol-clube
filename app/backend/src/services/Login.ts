import { compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { LoginSchema } from '../validations/User';
import ValidationError from '../errors/ValidationError';
import User from '../database/models/User';
import BadRequestError from '../errors/BadRequestError';

export default class LoginService {
  public static async login(email: string, password: string) {
    if (!email || !password) {
      throw new ValidationError('All fields must be filled');
    }

    const user = await User.findOne({ where: { email } });

    if (!user
      || !compareSync(password, String(user.dataValues.password))
      || !LoginService.isEmailAndPasswordValid(email, password)) {
      throw new BadRequestError('Invalid email or password');
    }
    if (user.dataValues?.password) {
      delete user.dataValues.password;
    }

    return sign({ user: user.dataValues }, 'secret', {
      expiresIn: '1d',
    });
  }

  public static isEmailAndPasswordValid(email: string, password: string) {
    return LoginSchema.safeParse({ email, password }).success;
  }
}