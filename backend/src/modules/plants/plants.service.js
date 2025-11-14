const plantsRepository = require("./plants.repository");

const getAllPlants = async () => {
    return await plantsRepository.findAll();
};

const getPlantById = async (id) => {
    return await plantsRepository.findById(id);
};

const createPlant = async (data) => {
    const { roundId, playerId, roundTimeMs, site, locationX, locationY } = data;
    return await plantsRepository.create({
        roundId,
        playerId,
        roundTimeMs,
        site,
        locationX: locationX ? locationX : null,
        locationY: locationY ? locationY : null,
    });
};

const updatePlant = async (id, data) => {
    const { roundId, playerId, roundTimeMs, site, locationX, locationY } = data;
    return await plantsRepository.update(id, {
        roundId,
        playerId,
        roundTimeMs,
        site,
        locationX,
        locationY,
    });
};

const deletePlant = async (id) => {
    return await plantsRepository.remove(id);
};

module.exports = {
    getAllPlants,
    getPlantById,
    createPlant,
    updatePlant,
    deletePlant,
};
