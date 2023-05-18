import { Model, DataTypes } from 'sequelize';
import sequelize from '.';
import TeamInterface from '../../types/Teams';

// export type TeamCreateAttr = Omit<TeamInterface, 'id'>;

class Team extends Model<TeamInterface> implements TeamInterface {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  public id!: number;
  public teamName!: string;
  // static associate(models: any) {
  //   console.log(models);
  // }
}

Team.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: DataTypes.STRING,
}, {
  underscored: true,
  sequelize,
  modelName: 'Team',
  timestamps: false,
  tableName: 'teams',
});

export default Team;
