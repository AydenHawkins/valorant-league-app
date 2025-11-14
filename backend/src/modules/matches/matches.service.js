const matchesRepository = require("./matches.repository");

const getAllMatches = async () => {
    return await matchesRepository.findAll();
};

const getMatchById = async (id) => {
    return await matchesRepository.findById(id);
};

const createMatch = async (data) => {
    const {
        seriesId,
        matchNumber,
        riotMatchId,
        mapId,
        gameLengthMs,
        startedAt,
        completedAt,
        isCompleted,
        status,
        winnerTeamSide,
    } = data;
    return await matchesRepository.create({
        seriesId,
        matchNumber,
        riotMatchId,
        mapId,
        gameLengthMs: gameLengthMs ? gameLengthMs : null,
        startedAt,
        completedAt: completedAt ? completedAt : null,
        isCompleted,
        status,
        winnerTeamSide: winnerTeamSide ? winnerTeamSide : null,
    });
};

const updateMatch = async (id, data) => {
    const {
        seriesId,
        matchNumber,
        riotMatchId,
        mapId,
        gameLengthMs,
        startedAt,
        completedAt,
        isCompleted,
        status,
        winnerTeamSide,
    } = data;
    return await matchesRepository.update(id, {
        seriesId,
        matchNumber,
        riotMatchId,
        mapId,
        gameLengthMs,
        startedAt,
        completedAt,
        isCompleted,
        status,
        winnerTeamSide,
    });
};

const deleteMatch = async (id) => {
    return await matchesRepository.remove(id);
};

module.exports = {
    getAllMatches,
    getMatchById,
    createMatch,
    updateMatch,
    deleteMatch,
};
