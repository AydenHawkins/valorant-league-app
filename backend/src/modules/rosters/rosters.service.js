const rostersRepository = require("./rosters.repository");

const getAllRosters = async () => {
    return await rostersRepository.findAll();
};

const getRosterById = async (id) => {
    return await rostersRepository.findById(id);
};

const createRoster = async (data) => {
    const { teamId, playerId, seasonId, startDate, endDate } = data;
    return await rostersRepository.create({
        teamId,
        playerId,
        seasonId,
        startDate,
        endDate: endDate ? endDate : null,
    });
};

const updateRoster = async (id, data) => {
    const { teamId, playerId, seasonId, startDate, endDate } = data;
    return await rostersRepository.update(id, {
        teamId,
        playerId,
        seasonId,
        startDate,
        endDate,
    });
};

const deleteRoster = async (id) => {
    return await rostersRepository.remove(id);
};

module.exports = {
    getAllRosters,
    getRosterById,
    createRoster,
    updateRoster,
    deleteRoster,
};
