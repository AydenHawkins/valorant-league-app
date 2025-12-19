import prisma from "../../utils/prisma";

interface PlayerData {
    puuid: string;
    name?: string;
    tag?: string;
}

/**
 * Find or create a player by PUUID
 */
export const upsertPlayer = async (playerData: PlayerData) => {
    const name =
        playerData.name || `Unknown-${playerData.puuid.substring(0, 8)}`;
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
 */
export const createMatch = async (matchData: any) => {
    return await prisma.match.create({
        data: matchData,
    });
};

/**
 * Create a match participation record
 */
export const createMatchParticipation = async (participationData: any) => {
    return await prisma.matchParticipation.create({
        data: participationData,
    });
};

/**
 * Create match player stats record
 */
export const createMatchPlayerStats = async (statsData: any) => {
    return await prisma.matchPlayerStats.create({
        data: statsData,
    });
};

/**
 * Create a round record
 */
export const createRound = async (roundData: any) => {
    return await prisma.round.create({
        data: roundData,
    });
};

/**
 * Create round player stats record
 */
export const createRoundPlayerStats = async (statsData: any) => {
    return await prisma.roundPlayerStats.create({
        data: statsData,
    });
};

/**
 * Create round team stats record
 */
export const createRoundTeamStats = async (statsData: any) => {
    return await prisma.roundTeamStats.create({
        data: statsData,
    });
};

/**
 * Create a kill record
 */
export const createKill = async (killData: any) => {
    return await prisma.kill.create({
        data: killData,
    });
};

/**
 * Create a plant record
 */
export const createPlant = async (plantData: any) => {
    return await prisma.plant.create({
        data: plantData,
    });
};

/**
 * Create a defuse record
 */
export const createDefuse = async (defuseData: any) => {
    return await prisma.defuse.create({
        data: defuseData,
    });
};

/**
 * Create match team stats record
 */
export const createMatchTeamStats = async (statsData: any) => {
    return await prisma.matchTeamStats.create({
        data: statsData,
    });
};

/**
 * Bulk create multiple records using a transaction
 */
export const executeTransaction = async (operations: any[]) => {
    return await prisma.$transaction(operations);
};

/**
 * Find player by PUUID
 */
export const findPlayerByPuuid = async (puuid: string) => {
    return await prisma.player.findUnique({
        where: { puuid },
    });
};

/**
 * Check if match already exists by riotMatchId
 */
export const findMatchByRiotId = async (riotMatchId: string) => {
    return await prisma.match.findUnique({
        where: { riotMatchId },
    });
};
