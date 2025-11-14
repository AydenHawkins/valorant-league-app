const prisma = require("../../utils/prisma");

/**
 * Find or create a player by PUUID
 * @param {Object} playerData - Player data {puuid, name, tag}
 * @returns {Promise<Object>} Player record
 */
const upsertPlayer = async (playerData) => {
    // Handle empty names/tags - use a placeholder with PUUID
    const name = playerData.name || `Unknown-${playerData.puuid.substring(0, 8)}`;
    const tag = playerData.tag || "0000";

    return await prisma.player.upsert({
        where: { puuid: playerData.puuid },
        update: {
            name: name,
            tag: tag,
        },
        create: {
            puuid: playerData.puuid,
            name: name,
            tag: tag,
        },
    });
};

/**
 * Create a match record
 * @param {Object} matchData - Match data
 * @returns {Promise<Object>} Created match record
 */
const createMatch = async (matchData) => {
    return await prisma.match.create({
        data: matchData,
    });
};

/**
 * Create a match participation record
 * @param {Object} participationData - Match participation data
 * @returns {Promise<Object>} Created match participation record
 */
const createMatchParticipation = async (participationData) => {
    return await prisma.matchParticipation.create({
        data: participationData,
    });
};

/**
 * Create match player stats record
 * @param {Object} statsData - Match player stats data
 * @returns {Promise<Object>} Created match player stats record
 */
const createMatchPlayerStats = async (statsData) => {
    return await prisma.matchPlayerStats.create({
        data: statsData,
    });
};

/**
 * Create a round record
 * @param {Object} roundData - Round data
 * @returns {Promise<Object>} Created round record
 */
const createRound = async (roundData) => {
    return await prisma.round.create({
        data: roundData,
    });
};

/**
 * Create round player stats record
 * @param {Object} statsData - Round player stats data
 * @returns {Promise<Object>} Created round player stats record
 */
const createRoundPlayerStats = async (statsData) => {
    return await prisma.roundPlayerStats.create({
        data: statsData,
    });
};

/**
 * Create round team stats record
 * @param {Object} statsData - Round team stats data
 * @returns {Promise<Object>} Created round team stats record
 */
const createRoundTeamStats = async (statsData) => {
    return await prisma.roundTeamStats.create({
        data: statsData,
    });
};

/**
 * Create a kill record
 * @param {Object} killData - Kill data
 * @returns {Promise<Object>} Created kill record
 */
const createKill = async (killData) => {
    return await prisma.kill.create({
        data: killData,
    });
};

/**
 * Create a plant record
 * @param {Object} plantData - Plant data
 * @returns {Promise<Object>} Created plant record
 */
const createPlant = async (plantData) => {
    return await prisma.plant.create({
        data: plantData,
    });
};

/**
 * Create a defuse record
 * @param {Object} defuseData - Defuse data
 * @returns {Promise<Object>} Created defuse record
 */
const createDefuse = async (defuseData) => {
    return await prisma.defuse.create({
        data: defuseData,
    });
};

/**
 * Create match team stats record
 * @param {Object} statsData - Match team stats data
 * @returns {Promise<Object>} Created match team stats record
 */
const createMatchTeamStats = async (statsData) => {
    return await prisma.matchTeamStats.create({
        data: statsData,
    });
};

/**
 * Bulk create multiple records using a transaction
 * @param {Array} operations - Array of Prisma operations
 * @returns {Promise<Array>} Results of all operations
 */
const executeTransaction = async (operations) => {
    return await prisma.$transaction(operations);
};

/**
 * Find player by PUUID
 * @param {string} puuid - Player PUUID
 * @returns {Promise<Object|null>} Player record or null
 */
const findPlayerByPuuid = async (puuid) => {
    return await prisma.player.findUnique({
        where: { puuid },
    });
};

/**
 * Check if match already exists by riotMatchId
 * @param {string} riotMatchId - Riot match ID
 * @returns {Promise<Object|null>} Match record or null
 */
const findMatchByRiotId = async (riotMatchId) => {
    return await prisma.match.findUnique({
        where: { riotMatchId },
    });
};

module.exports = {
    upsertPlayer,
    createMatch,
    createMatchParticipation,
    createMatchPlayerStats,
    createRound,
    createRoundPlayerStats,
    createRoundTeamStats,
    createKill,
    createPlant,
    createDefuse,
    createMatchTeamStats,
    executeTransaction,
    findPlayerByPuuid,
    findMatchByRiotId,
};
