const defusesRepository = require("./defuses.repository");

const getAllDefuses = async () => {
    return await defusesRepository.findAll();
};

const getDefuseById = async (id) => {
    return await defusesRepository.findById(id);
};

const createDefuse = async (data) => {
    const { roundId, playerId, roundTimeMs, locationX, locationY } = data;
    return await defusesRepository.create({
        roundId,
        playerId,
        roundTimeMs,
        locationX: locationX ? locationX : null,
        locationY: locationY ? locationY : null,
    });
};

const updateDefuse = async (id, data) => {
    const { roundId, playerId, roundTimeMs, locationX, locationY } = data;
    return await defusesRepository.update(id, {
        roundId,
        playerId,
        roundTimeMs,
        locationX,
        locationY,
    });
};

const deleteDefuse = async (id) => {
    return await defusesRepository.remove(id);
};

module.exports = {
    getAllDefuses,
    getDefuseById,
    createDefuse,
    updateDefuse,
    deleteDefuse,
};
