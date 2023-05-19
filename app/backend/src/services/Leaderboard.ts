import MatchesInterface, { MatchTeams } from '../types/Matches';
import { getAllMatches } from './Match';

export interface MatchesLeaderboard extends MatchesInterface {
  homeTeam: MatchTeams;
  awayTeam: MatchTeams;
}

export interface Leaderboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
}

export const defaultMatchAttributes = (
  current: Leaderboard,
  teamGoals1: number,
  teamGoals2: number,
  points: number,
) => {
  const newLeaderboard = { ...current };
  newLeaderboard.totalGames += 1;
  newLeaderboard.goalsFavor += teamGoals1;
  newLeaderboard.goalsOwn += teamGoals2;
  newLeaderboard.goalsBalance = newLeaderboard.goalsFavor - newLeaderboard.goalsOwn;
  newLeaderboard.efficiency = (
    ((newLeaderboard.totalPoints + points) / (newLeaderboard.totalGames * 3)) * 100)
    .toFixed(2);
  return newLeaderboard;
};

export const addVictory = (current: Leaderboard, winTeamGoals: number, loseTeamGoals: number) => {
  const newLeaderboard = { ...defaultMatchAttributes(current, winTeamGoals, loseTeamGoals, 3) };
  newLeaderboard.totalVictories += 1;
  newLeaderboard.totalPoints += 3;
  return newLeaderboard;
};

export const addLose = (current: Leaderboard, loseTeamGoals: number, winTeamGoals: number) => {
  const newLeaderboard = { ...defaultMatchAttributes(current, loseTeamGoals, winTeamGoals, 0) };
  newLeaderboard.totalLosses += 1;
  return newLeaderboard;
};

export const addDraw = (current: Leaderboard, teamGoals1: number, teamGoals2: number) => {
  const newLeaderboard = { ...defaultMatchAttributes(current, teamGoals1, teamGoals2, 1) };
  newLeaderboard.totalDraws += 1;
  newLeaderboard.totalPoints += 1;
  return newLeaderboard;
};

const initialPlaceholder = {
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0.0,
};

const initiate = (
  homeTeamName: string,
  awayTeamName: string,
  acc: any,
): [Leaderboard, Leaderboard] => {
  const homeTeam = acc[homeTeamName]
    ? acc[homeTeamName]
    : { ...initialPlaceholder, name: homeTeamName };
  const awayTeam = acc[awayTeamName]
    ? acc[awayTeamName]
    : { ...initialPlaceholder, name: awayTeamName };
  return [homeTeam, awayTeam];
};

export const extractLeaderboard = (matches: MatchesLeaderboard[]) => matches.reduce((
  acc: any,
  match,
) => {
  const {
    homeTeam: { teamName: homeTeamName }, homeTeamGoals,
    awayTeam: { teamName: awayTeamName }, awayTeamGoals } = match;
  const [homeTeam, awayTeam] = initiate(homeTeamName, awayTeamName, acc);
  if (homeTeamGoals > awayTeamGoals) {
    acc[homeTeamName] = addVictory(homeTeam, homeTeamGoals, awayTeamGoals);
    acc[awayTeamName] = addLose(awayTeam, awayTeamGoals, homeTeamGoals);
  } else if (homeTeamGoals < awayTeamGoals) {
    acc[awayTeamName] = addVictory(awayTeam, awayTeamGoals, homeTeamGoals);
    acc[homeTeamName] = addLose(homeTeam, homeTeamGoals, awayTeamGoals);
  } else {
    acc[homeTeamName] = addDraw(homeTeam, homeTeamGoals, awayTeamGoals);
    acc[awayTeamName] = addDraw(awayTeam, awayTeamGoals, homeTeamGoals);
  }
  return acc;
}, {});

export const extractLeaderboardHome = (matches: MatchesLeaderboard[]) => matches.reduce((
  acc: any,
  match,
) => {
  const {
    homeTeam: { teamName: homeTeamName }, homeTeamGoals,
    awayTeam: { teamName: awayTeamName }, awayTeamGoals } = match;
  const [homeTeam] = initiate(homeTeamName, awayTeamName, acc);
  if (homeTeamGoals > awayTeamGoals) {
    acc[homeTeamName] = addVictory(homeTeam, homeTeamGoals, awayTeamGoals);
  } else if (homeTeamGoals < awayTeamGoals) {
    acc[homeTeamName] = addLose(homeTeam, homeTeamGoals, awayTeamGoals);
  } else {
    acc[homeTeamName] = addDraw(homeTeam, homeTeamGoals, awayTeamGoals);
  }
  return acc;
}, {});

export const getLeaderboardHome = async () => {
  const allMatches = (await getAllMatches(false) as unknown) as MatchesLeaderboard[];

  const leaderboardObj = extractLeaderboardHome(allMatches);
  const leaderboard = Object.values(leaderboardObj)
    .sort((a: any, b: any) => b.goalsFavor - a.goalsFavor)
    .sort((a: any, b: any) => b.goalsBalance - a.goalsBalance)
    .sort((a: any, b: any) => b.totalPoints - a.totalPoints);

  return leaderboard;
};

export const getLeaderboardAway = async () => {};

export const getLeaderboardGeneral = async () => {};
