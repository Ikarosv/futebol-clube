import Team from '../models/Team';

export const getAllTeams = async () => {
  const allTeams = await Team.findAll();

  return allTeams;
};

export const getTeam = (_id: number) => {};
