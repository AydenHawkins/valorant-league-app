const matchParticipationsRepository = require("./matchParticipations.repository");

const getAllMatchParticipations = async () => {
  return await matchParticipationsRepository.findAll();
};

const getMatchParticipationById = async (id) => {
  return await matchParticipationsRepository.findById(id);
};

const createMatchParticipation = async (data) => {
  const { matchId, playerId, teamId, teamSide, agentId } = data;
  return await matchParticipationsRepository.create({
    matchId,
    playerId,
    teamId,
    teamSide,
    agentId: agentId ? agentId : null,
  });
};

const updateMatchParticipation = async (id, data) => {
  const { matchId, playerId, teamId, teamSide, agentId } = data;
  return await matchParticipationsRepository.update(id, {
    matchId,
    playerId,
    teamId,
    teamSide,
    agentId,
  });
};

const deleteMatchParticipation = async (id) => {
  return await matchParticipationsRepository.remove(id);
};

module.exports = {
  getAllMatchParticipations,
  getMatchParticipationById,
  createMatchParticipation,
  updateMatchParticipation,
  deleteMatchParticipation,
};
