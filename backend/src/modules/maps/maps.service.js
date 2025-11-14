const mapsRepository = require("./maps.repository");

const getAllMaps = async () => {
  return await mapsRepository.findAll();
};

const getMapById = async (id) => {
  return await mapsRepository.findById(id);
};

const createMap = async (data) => {
  const { id, name } = data;
  return await mapsRepository.create({ id, name });
};

const updateMap = async (id, data) => {
  const { name } = data;
  return await mapsRepository.update(id, { name });
};

const deleteMap = async (id) => {
  return await mapsRepository.remove(id);
};

module.exports = {
  getAllMaps,
  getMapById,
  createMap,
  updateMap,
  deleteMap,
};
