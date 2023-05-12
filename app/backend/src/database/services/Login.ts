import { hashSync, compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import ValidationError from '../../errors/ValidationError';
import User from '../models/User';

export default class LoginService {
  public static async login(email: string, password: string) {
    if (!email || !password) {
      throw new ValidationError('All fields must be filled');
    }

    const encryptedPassword = this.encryptPassword(password);
    console.log(encryptedPassword);

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user || !compareSync(password, String(user.password))) {
      throw new ValidationError('Invalid email or password');
    }

    delete user.password;

    return sign({ user }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1d',
    });
  }

  public static encryptPassword(password: string) {
    return hashSync(password, 8);
  }
}
