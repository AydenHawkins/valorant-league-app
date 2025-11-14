const substitutionsRepository = require("./substitutions.repository");

const getAllSubstitutions = async () => {
    return await substitutionsRepository.findAll();
};

const getSubstitutionById = async (id) => {
    return await substitutionsRepository.findById(id);
};

const createSubstitution = async (data) => {
    const { matchId, teamId, substitutedInId, substitutedOutId, timeStamp } = data;
    return await substitutionsRepository.create({
        matchId,
        teamId,
        substitutedInId,
        substitutedOutId,
        timeStamp,
    });
};

const updateSubstitution = async (id, data) => {
    const { matchId, teamId, substitutedInId, substitutedOutId, timeStamp } = data;
    return await substitutionsRepository.update(id, {
        matchId,
        teamId,
        substitutedInId,
        substitutedOutId,
        timeStamp,
    });
};

const deleteSubstitution = async (id) => {
    return await substitutionsRepository.remove(id);
};

module.exports = {
    getAllSubstitutions,
    getSubstitutionById,
    createSubstitution,
    updateSubstitution,
    deleteSubstitution,
};
