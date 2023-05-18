import { DataTypes, Model } from 'sequelize';
import sequelize from '.';
import MatchesInterface from '../../types/Matches';
import Team from './Team';

class Matches extends Model<MatchesInterface> {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    Team.hasMany(Matches, { foreignKey: 'homeTeamId', as: 'homeTeam' });
    Team.hasMany(Matches, { foreignKey: 'awayTeamId', as: 'awayTeam' });
    Matches.belongsTo(models.Team, {
      foreignKey: 'homeTeamId',
      as: 'homeTeam',
    });
    Matches.belongsTo(models.Team, {
      foreignKey: 'awayTeamId',
      as: 'awayTeam',
    });
  }
}

Matches.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: DataTypes.INTEGER,
  homeTeamGoals: DataTypes.INTEGER,
  awayTeamId: DataTypes.INTEGER,
  awayTeamGoals: DataTypes.INTEGER,
  inProgress: DataTypes.BOOLEAN,
}, {
  underscored: true,
  sequelize,
  modelName: 'Matches',
  tableName: 'matches',
  timestamps: false,
});

export default Matches;
