import Team from '../database/models/Team';
import Matches from '../database/models/Match';

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
    console.log('aaaaaaaaaaaaaaaaaaaaa');
    
  }
console.log(query);

  return Matches.findAll(query);
};

export const getMatchById = async (_id: number) => {};
