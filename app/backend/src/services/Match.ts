import Team from '../database/models/Team';
import Matches from '../database/models/Match';
import NotFoundError from '../errors/NotFoundError';

export const getAllMatches = async (inProgress?: boolean) => {
  const query = {
    include: [
      {
        model: Team,
        as: 'homeTeam',
        attributes: ['teamName'],
      },
      {
        model: Team,
        as: 'awayTeam',
        attributes: ['teamName'],
      },
    ],
  };

  if (inProgress !== undefined) {
    Object.assign(query, { where: { inProgress } });
  }

  return Matches.findAll(query);
};

export const finishMatch = async (id: number) => {
  const [affectedRows] = await Matches.update({ inProgress: false }, { where: { id } });

  if (!affectedRows) {
    throw new NotFoundError('Match not found');
  }
};
