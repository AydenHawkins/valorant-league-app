import * as roundPlayerStatsRepository from "./roundPlayerStats.repository";

interface RoundPlayerStatInput {
    roundId: number;
    matchParticipationId: number;
    playerId: number;
    score: number;
    kills: number;
    headshots: number;
    bodyshots: number;
    legshots: number;
    grenadeCasts?: number;
    ability1Casts?: number;
    ability2Casts?: number;
    ultimateCasts?: number;
    loadoutValue?: number;
    creditsRemaining?: number;
    weaponId?: string;
    weaponName?: string;
    armorId?: string;
    armorName?: string;
}

export const getAllRoundPlayerStats = async () => {
    return await roundPlayerStatsRepository.findAll();
};

export const getRoundPlayerStatById = async (id: string) => {
    return await roundPlayerStatsRepository.findById(id);
};

export const createRoundPlayerStat = async (data: RoundPlayerStatInput) => {
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

export const updateRoundPlayerStat = async (id: string, data: Partial<RoundPlayerStatInput>) => {
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

export const deleteRoundPlayerStat = async (id: string) => {
    return await roundPlayerStatsRepository.remove(id);
};
