import { Model, DataTypes } from 'sequelize';
import sequelize from '.';

class Team extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  // static associate(models) {
  //   // models.Team.hasMany(models.Match, { foreignKey: 'home_team_id', as: 'matches' });
  // }
}
Team.init({
  id: DataTypes.INTEGER,
  teamName: DataTypes.STRING,
}, {
  underscored: true,
  sequelize,
  modelName: 'Team',
  timestamps: false,
  tableName: 'teams',
});

export default Team;
