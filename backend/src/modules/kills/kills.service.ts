import * as killsRepository from "./kills.repository";

export const getAllKills = async () => {
    return await killsRepository.findAll();
};

export const getKillById = async (id: string) => {
    return await killsRepository.findById(id);
};

interface CreateKillInput {
    matchId: number;
    roundNumber: number;
    timeInRoundMs: number;
    timeInMatchMs: number;
    killerId: number;
    victimId: number;
    locationX?: number | null;
    locationY?: number | null;
    weaponId?: string | null;
    weaponName?: string | null;
    weaponType?: string | null;
    secondaryFireMode?: boolean;
}

export const createKill = async (data: CreateKillInput) => {
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

interface UpdateKillInput {
    matchId?: number;
    roundNumber?: number;
    timeInRoundMs?: number;
    timeInMatchMs?: number;
    killerId?: number;
    vicitimId?: number;
    locationX?: number | null;
    locationY?: number | null;
    weaponId?: string | null;
    weaponName?: string | null;
    weaponType?: string | null;
    secondaryFireMode?: boolean;
}

export const updateKill = async (id: string, data: UpdateKillInput) => {
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

export const deleteKill = async (id: string) => {
    return await killsRepository.remove(id);
};
