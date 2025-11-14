const leaguesRepository = require("./leagues.repository");

const getAllLeagues = async () => {
  return await leaguesRepository.findAll();
};

const getLeagueById = async (id) => {
  return await leaguesRepository.findById(id);
};

const createLeague = async (data) => {
  const { name } = data;
  return await leaguesRepository.create({ name });
};

const updateLeague = async (id, data) => {
  const { name } = data;
  return await leaguesRepository.update(id, { name });
};

const deleteLeague = async (id) => {
  return await leaguesRepository.remove(id);
};

module.exports = {
  getAllLeagues,
  getLeagueById,
  createLeague,
  updateLeague,
  deleteLeague,
};
