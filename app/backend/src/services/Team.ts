import { Op } from 'sequelize';
import NotFoundError from '../errors/NotFoundError';
import Team from '../database/models/Team';

export const getAllTeams = async () => {
  const allTeams = await Team.findAll();

  return allTeams;
};

export const getTeamById = async (id: number) => {
  const team = await Team.findOne({ where: { id } });

  if (!team) throw new NotFoundError('Time não encontrado');

  return team;
};

export const searchTeams = async (teamIdsOrName: string[] | number[]) => {
  const teams = await Team.findAll({
    where: {
      [Op.or]: [
        { id: { [Op.in]: teamIdsOrName } },
        { teamName: { [Op.in]: teamIdsOrName } },
      ],
    },
  });

  return teams;
};
