import * as roundTeamStatsRepository from "./roundTeamStats.repository";

interface RoundTeamStatInput {
  roundId: number;
  teamId: number;
  teamSide: string;
  won: boolean;
}

export const getAllRoundTeamStats = async () => {
  return await roundTeamStatsRepository.findAll();
};

export const getRoundTeamStatById = async (id: string) => {
  return await roundTeamStatsRepository.findById(id);
};

export const createRoundTeamStat = async (data: RoundTeamStatInput) => {
  const { roundId, teamId, teamSide, won } = data;
  return await roundTeamStatsRepository.create({
    roundId,
    teamId,
    teamSide,
    won,
  });
};

export const updateRoundTeamStat = async (
  id: string,
  data: Partial<RoundTeamStatInput>,
) => {
  const { roundId, teamId, teamSide, won } = data;
  return await roundTeamStatsRepository.update(id, {
    roundId,
    teamId,
    teamSide,
    won,
  });
};

export const deleteRoundTeamStat = async (id: string) => {
  return await roundTeamStatsRepository.remove(id);
};
