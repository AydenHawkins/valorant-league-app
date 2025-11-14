const roundTeamStatsRepository = require("./roundTeamStats.repository");

const getAllRoundTeamStats = async () => {
  return await roundTeamStatsRepository.findAll();
};

const getRoundTeamStatById = async (id) => {
  return await roundTeamStatsRepository.findById(id);
};

const createRoundTeamStat = async (data) => {
  const { roundId, teamId, teamSide, won } = data;
  return await roundTeamStatsRepository.create({
    roundId,
    teamId,
    teamSide,
    won,
  });
};

const updateRoundTeamStat = async (id, data) => {
  const { roundId, teamId, teamSide, won } = data;
  return await roundTeamStatsRepository.update(id, {
    roundId,
    teamId,
    teamSide,
    won,
  });
};

const deleteRoundTeamStat = async (id) => {
  return await roundTeamStatsRepository.remove(id);
};

module.exports = {
  getAllRoundTeamStats,
  getRoundTeamStatById,
  createRoundTeamStat,
  updateRoundTeamStat,
  deleteRoundTeamStat,
};
