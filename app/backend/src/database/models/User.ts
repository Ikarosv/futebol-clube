import { DataTypes, Model } from 'sequelize';
import UserInterface from '../../types/Users';
import sequelize from '.';

class User extends Model<UserInterface> implements UserInterface {
  public id!: number;
  public username!: string;
  public role!: string;
  public email!: string;
  public password!: string;
}
User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  underscored: true,
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: false,
});

export default User;
