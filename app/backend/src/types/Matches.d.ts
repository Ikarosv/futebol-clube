type MatchTeams = {
  id?: number;
  teamName: string;
};

export default interface MatchesInterface {
  id?: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeTeam?: MatchTeams;
  awayTeam?: MatchTeams;
}
