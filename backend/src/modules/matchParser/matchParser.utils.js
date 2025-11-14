/**
 * Utility functions for parsing and calculating Valorant match statistics
 */

/**
 * Calculate headshot percentage
 * @param {number} headshots - Number of headshots
 * @param {number} bodyshots - Number of bodyshots
 * @param {number} legshots - Number of legshots
 * @returns {number} Headshot percentage (0-100)
 */
const calculateHeadshotPercentage = (headshots, bodyshots, legshots) => {
    const totalShots = headshots + bodyshots + legshots;
    if (totalShots === 0) return 0;
    return Number(((headshots / totalShots) * 100).toFixed(2));
};

/**
 * Calculate K/D ratio
 * @param {number} kills - Number of kills
 * @param {number} deaths - Number of deaths
 * @returns {number} K/D ratio
 */
const calculateKDRatio = (kills, deaths) => {
    if (deaths === 0) return kills;
    return Number((kills / deaths).toFixed(2));
};

/**
 * Calculate K/D/A ratio
 * @param {number} kills - Number of kills
 * @param {number} deaths - Number of deaths
 * @param {number} assists - Number of assists
 * @returns {number} K/D/A ratio
 */
const calculateKDA = (kills, deaths, assists) => {
    if (deaths === 0) return kills + assists;
    return Number(((kills + assists) / deaths).toFixed(2));
};

/**
 * Calculate average combat score per round
 * @param {number} totalScore - Total combat score
 * @param {number} rounds - Number of rounds played
 * @returns {number} Average combat score
 */
const calculateACS = (totalScore, rounds) => {
    if (rounds === 0) return 0;
    return Number((totalScore / rounds).toFixed(1));
};

/**
 * Calculate average damage per round
 * @param {number} totalDamage - Total damage dealt
 * @param {number} rounds - Number of rounds played
 * @returns {number} Average damage per round
 */
const calculateADR = (totalDamage, rounds) => {
    if (rounds === 0) return 0;
    return Number((totalDamage / rounds).toFixed(1));
};

/**
 * Calculate first bloods (needs to be counted from kills data)
 * @param {Array} roundKills - Array of all kills in the match organized by round
 * @param {string} puuid - Player's PUUID
 * @returns {number} Number of first bloods
 */
const calculateFirstBloods = (roundKills, puuid) => {
    let firstBloods = 0;
    for (const roundKillsList of roundKills) {
        if (roundKillsList && roundKillsList.length > 0) {
            // First kill in the round
            if (roundKillsList[0].killer === puuid) {
                firstBloods++;
            }
        }
    }
    return firstBloods;
};

/**
 * Calculate first deaths
 * @param {Array} roundKills - Array of all kills in the match organized by round
 * @param {string} puuid - Player's PUUID
 * @returns {number} Number of first deaths
 */
const calculateFirstDeaths = (roundKills, puuid) => {
    let firstDeaths = 0;
    for (const roundKillsList of roundKills) {
        if (roundKillsList && roundKillsList.length > 0) {
            // First kill in the round
            if (roundKillsList[0].victim === puuid) {
                firstDeaths++;
            }
        }
    }
    return firstDeaths;
};

/**
 * Determine team side for a round
 * @param {number} roundNumber - Round number (0-indexed)
 * @param {string} initialSide - Initial team side (Red/Blue)
 * @returns {string} Team side for the round (Attack/Defense)
 */
const getTeamSideForRound = (roundNumber, initialSide) => {
    // In Valorant, teams swap sides at round 12 (0-indexed: round 12)
    // Rounds 0-11: initial sides
    // Rounds 12+: swapped sides
    const isSwapped = roundNumber >= 12;

    // Assuming Red starts on Attack and Blue starts on Defense (standard)
    if (initialSide === "Red") {
        return isSwapped ? "Defense" : "Attack";
    } else {
        return isSwapped ? "Attack" : "Defense";
    }
};

/**
 * Map team_id to standardized team side
 * @param {string} teamId - Team ID from API (Red/Blue)
 * @param {number} roundNumber - Round number
 * @returns {string} Standardized team side (Attack/Defense)
 */
const mapTeamIdToSide = (teamId, roundNumber) => {
    return getTeamSideForRound(roundNumber, teamId);
};

/**
 * Extract player IDs (PUUIDs) for a team
 * @param {Array} players - Array of player objects
 * @param {string} teamId - Team ID (Red/Blue)
 * @returns {Array} Array of PUUIDs for the team
 */
const getTeamPlayerIds = (players, teamId) => {
    return players.filter((p) => p.team_id === teamId).map((p) => p.puuid);
};

/**
 * Calculate plants and defuses for a player
 * @param {Array} rounds - Array of round objects
 * @param {string} puuid - Player's PUUID
 * @returns {Object} {plants: number, defuses: number}
 */
const calculatePlantsAndDefuses = (rounds, puuid) => {
    let plants = 0;
    let defuses = 0;

    for (const round of rounds) {
        if (round.plant && round.plant.player.puuid === puuid) {
            plants++;
        }
        if (round.defuse && round.defuse.player.puuid === puuid) {
            defuses++;
        }
    }

    return { plants, defuses };
};

/**
 * Organize kills by round
 * @param {Array} allKills - Array of all kill events from the match (from .data.kills)
 * @param {number} totalRounds - Total number of rounds in the match
 * @returns {Array} Array of arrays, where each inner array contains kills for that round
 */
const organizeKillsByRound = (allKills, totalRounds) => {
    // Initialize array with empty arrays for each round
    const killsByRound = Array.from({ length: totalRounds }, () => []);

    // Group kills by their round number
    for (const kill of allKills) {
        const roundIndex = kill.round;
        if (roundIndex >= 0 && roundIndex < totalRounds) {
            killsByRound[roundIndex].push({
                killer: kill.killer.puuid,
                victim: kill.victim.puuid,
                weapon: kill.weapon?.name || "Unknown",
                time: kill.time_in_round_in_ms,
            });
        }
    }

    return killsByRound;
};

module.exports = {
    calculateHeadshotPercentage,
    calculateKDRatio,
    calculateKDA,
    calculateACS,
    calculateADR,
    calculateFirstBloods,
    calculateFirstDeaths,
    getTeamSideForRound,
    mapTeamIdToSide,
    getTeamPlayerIds,
    calculatePlantsAndDefuses,
    organizeKillsByRound,
};
