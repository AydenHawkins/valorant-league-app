const teamsRepository = require("./teams.repository");

const getAllTeams = async () => {
  return await teamsRepository.findAll();
};

const getTeamById = async (id) => {
  return await teamsRepository.findById(id);
};

const createTeam = async (data) => {
  const { name } = data;
  return await teamsRepository.create({ name });
};

const updateTeam = async (id, data) => {
  const { name } = data;
  return await teamsRepository.update(id, { name });
};

const deleteTeam = async (id) => {
  return await teamsRepository.remove(id);
};

module.exports = {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
};
