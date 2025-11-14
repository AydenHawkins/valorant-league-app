const roundPlayerStatsRepository = require("./roundPlayerStats.repository");

const getAllRoundPlayerStats = async () => {
  return await roundPlayerStatsRepository.findAll();
};

const getRoundPlayerStatById = async (id) => {
  return await roundPlayerStatsRepository.findById(id);
};

const createRoundPlayerStat = async (data) => {
  const {
    roundId,
    matchParticipationId,
    playerId,
    score,
    kills,
    headshots,
    bodyshots,
    legshots,
    grenadeCasts,
    ability1Casts,
    ability2Casts,
    ultimateCasts,
    loadoutValue,
    creditsRemaining,
    weaponId,
    weaponName,
    armorId,
    armorName,
  } = data;
  return await roundPlayerStatsRepository.create({
    roundId,
    matchParticipationId,
    playerId,
    score,
    kills,
    headshots,
    bodyshots,
    legshots,
    grenadeCasts: grenadeCasts ? grenadeCasts : null,
    ability1Casts: ability1Casts ? ability1Casts : null,
    ability2Casts: ability2Casts ? ability2Casts : null,
    ultimateCasts: ultimateCasts ? ultimateCasts : null,
    loadoutValue: loadoutValue ? loadoutValue : null,
    creditsRemaining: creditsRemaining ? creditsRemaining : null,
    weaponId: weaponId ? weaponId : null,
    weaponName: weaponName ? weaponName : null,
    armorId: armorId ? armorId : null,
    armorName: armorName ? armorName : null,
  });
};

const updateRoundPlayerStat = async (id, data) => {
  const {
    roundId,
    matchParticipationId,
    playerId,
    score,
    kills,
    headshots,
    bodyshots,
    legshots,
    grenadeCasts,
    ability1Casts,
    ability2Casts,
    ultimateCasts,
    loadoutValue,
    creditsRemaining,
    weaponId,
    weaponName,
    armorId,
    armorName,
  } = data;
  return await roundPlayerStatsRepository.update(id, {
    roundId,
    matchParticipationId,
    playerId,
    score,
    kills,
    headshots,
    bodyshots,
    legshots,
    grenadeCasts,
    ability1Casts,
    ability2Casts,
    ultimateCasts,
    loadoutValue,
    creditsRemaining,
    weaponId,
    weaponName,
    armorId,
    armorName,
  });
};

const deleteRoundPlayerStat = async (id) => {
  return await roundPlayerStatsRepository.remove(id);
};

module.exports = {
  getAllRoundPlayerStats,
  getRoundPlayerStatById,
  createRoundPlayerStat,
  updateRoundPlayerStat,
  deleteRoundPlayerStat,
};
