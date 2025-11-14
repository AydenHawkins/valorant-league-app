const seasonsRepository = require("./seasons.repository");

const getAllSeasons = async () => {
    return await seasonsRepository.findAll();
};

const getSeasonById = async (id) => {
    return await seasonsRepository.findById(id);
};

const getSeasonsForLeague = async (leagueId) => {
    return await seasonsRepository.findByLeagueId(leagueId);
};

const createSeason = async (data) => {
    const { name, startDate, endDate } = data;
    return await seasonsRepository.create({
        name,
        startDate,
        endDate: endDate ? endDate : null,
    });
};

const createSeasonForLeague = async (leagueId, data) => {
    const { name, startDate, endDate } = data;
    return await seasonsRepository.createForLeague(leagueId, {
        name,
        startDate,
        endDate,
    });
};

const updateSeason = async (id, data) => {
    const { name, startDate, endDate } = data;
    return await seasonsRepository.update(id, { name, startDate, endDate });
};

const deleteSeason = async (id) => {
    return await seasonsRepository.remove(id);
};

module.exports = {
    getAllSeasons,
    getSeasonById,
    getSeasonsForLeague,
    createSeason,
    createSeasonForLeague,
    updateSeason,
    deleteSeason,
};
