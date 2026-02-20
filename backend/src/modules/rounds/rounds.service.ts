import * as roundsRepository from "./rounds.repository";

interface RoundInput {
  matchId: number;
  roundNumber: number;
  result: string;
  winningTeam: string;
}

export const getAllRounds = async () => {
  return await roundsRepository.findAll();
};

export const getRoundById = async (id: string) => {
  return await roundsRepository.findById(id);
};

export const createRound = async (data: RoundInput) => {
  const { matchId, roundNumber, result, winningTeam } = data;
  return await roundsRepository.create({
    matchId,
    roundNumber,
    result,
    winningTeam,
  });
};

export const updateRound = async (id: string, data: Partial<RoundInput>) => {
  const { matchId, roundNumber, result, winningTeam } = data;
  return await roundsRepository.update(id, {
    matchId,
    roundNumber,
    result,
    winningTeam,
  });
};

export const deleteRound = async (id: string) => {
  return await roundsRepository.remove(id);
};
