const agentsRepository = require("./agents.repository");

// Business logic for agents
const getAllAgents = async () => {
  return await agentsRepository.findAll();
};

const getAgentById = async (id) => {
  return await agentsRepository.findById(id);
};

const createAgent = async (data) => {
  const { id, name, role } = data;
  return await agentsRepository.create({ id, name, role });
};

const updateAgent = async (id, data) => {
  const { name, role } = data;
  return await agentsRepository.update(id, { name, role });
};

const deleteAgent = async (id) => {
  return await agentsRepository.remove(id);
};

module.exports = {
  getAllAgents,
  getAgentById,
  createAgent,
  updateAgent,
  deleteAgent,
};
