const playersRepository = require("./players.repository");

const getAllPlayers = async () => {
    return await playersRepository.findAll();
};

const getPlayerById = async (id) => {
    return await playersRepository.findById(id);
};

const createPlayer = async (data) => {
    const { name, tag, puuid } = data;
    return await playersRepository.create({ name, tag, puuid });
};

const updatePlayer = async (id, data) => {
    const { name, tag, puuid } = data;
    return await playersRepository.update(id, { name, tag, puuid });
};

const deletePlayer = async (id) => {
    return await playersRepository.remove(id);
};

module.exports = {
    getAllPlayers,
    getPlayerById,
    createPlayer,
    updatePlayer,
    deletePlayer,
};
