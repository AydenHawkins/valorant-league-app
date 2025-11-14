const killsRepository = require("./kills.repository");

const getAllKills = async () => {
    return await killsRepository.findAll();
};

const getKillById = async (id) => {
    return await killsRepository.findById(id);
};

const createKill = async (data) => {
    const {
        matchId,
        roundNumber,
        timeInRoundMs,
        timeInMatchMs,
        killerId,
        victimId,
        locationX,
        locationY,
        weaponId,
        weaponName,
        weaponType,
        secondaryFireMode,
    } = data;
    return await killsRepository.create({
        matchId,
        roundNumber,
        timeInRoundMs,
        timeInMatchMs,
        killerId,
        victimId,
        locationX: locationX ? locationX : null,
        locationY: locationY ? locationY : null,
        weaponId: weaponId ? weaponId : null,
        weaponName: weaponName ? weaponName : null,
        weaponType: weaponType ? weaponType : null,
        secondaryFireMode: secondaryFireMode ? secondaryFireMode : false,
    });
};

const updateKill = async (id, data) => {
    const {
        matchId,
        roundNumber,
        timeInRoundMs,
        timeInMatchMs,
        killerId,
        vicitimId,
        locationX,
        locationY,
        weaponId,
        weaponName,
        weaponType,
        secondaryFireMode,
    } = data;
    return await killsRepository.update(id, {
        matchId,
        roundNumber,
        timeInRoundMs,
        timeInMatchMs,
        killerId,
        vicitimId,
        locationX,
        locationY,
        weaponId,
        weaponName,
        weaponType,
        secondaryFireMode,
    });
};

const deleteKill = async (id) => {
    return await killsRepository.remove(id);
};

module.exports = {
    getAllKills,
    getKillById,
    createKill,
    updateKill,
    deleteKill,
};
