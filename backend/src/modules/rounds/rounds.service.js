const roundsRepository = require("./rounds.repository");

const getAllRounds = async () => {
  return await roundsRepository.findAll();
};

const getRoundById = async (id) => {
  return await roundsRepository.findById(id);
};

const createRound = async (data) => {
  const { matchId, roundNumber, result, winningTeam } = data;
  return await roundsRepository.create({
    matchId,
    roundNumber,
    result,
    winningTeam,
  });
};

const updateRound = async (id, data) => {
  const { matchId, roundNumber, result, winningTeam } = data;
  return await roundsRepository.update(id, {
    matchId,
    roundNumber,
    result,
    winningTeam,
  });
};

const deleteRound = async (id) => {
  return await roundsRepository.remove(id);
};

module.exports = {
  getAllRounds,
  getRoundById,
  createRound,
  updateRound,
  deleteRound,
};
