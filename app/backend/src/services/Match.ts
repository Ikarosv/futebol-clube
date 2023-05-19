import Team from '../database/models/Team';
import Matches from '../database/models/Match';
import NotFoundError from '../errors/NotFoundError';

export const getAllMatches = async (inProgress?: boolean) => {
  const query = {
    include: [
      { model: Team, as: 'homeTeam', attributes: ['teamName'] },
      { model: Team, as: 'awayTeam', attributes: ['teamName'] },
    ],
  };

  if (inProgress !== undefined) {
    Object.assign(query, { where: { inProgress } });
  }
  return Matches.findAll(query);
};

export const updateMatch = async (id: number, homeTeamGoals: number, awayTeamGoals: number) => {
  const [affectedRows] = await Matches.update(
    { homeTeamGoals, awayTeamGoals },
    { where: { id } },
  );

  if (!affectedRows) {
    throw new NotFoundError('Match not found');
  }
};

export const finishMatch = async (id: number) => {
  const [affectedRows] = await Matches.update({ inProgress: false }, { where: { id } });

  if (!affectedRows) {
    throw new NotFoundError('Match not found');
  }
};

export const createMatch = async (
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
) => {
  const match = await Matches.create({
    homeTeamId,
    awayTeamId,
    homeTeamGoals,
    awayTeamGoals,
    inProgress: true,
  });

  return match;
};
