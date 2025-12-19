import * as matchesRepository from "./matches.repository";

interface MatchInput {
    seriesId: number;
    matchNumber: number;
    riotMatchId: string;
    mapId: string;
    gameLengthMs?: number;
    startedAt: Date;
    completedAt?: Date;
    isCompleted: boolean;
    status: string;
    winnerTeamSide?: string;
}

export const getAllMatches = async () => {
    return await matchesRepository.findAll();
};

export const getMatchById = async (id: string) => {
    return await matchesRepository.findById(id);
};

export const createMatch = async (data: MatchInput) => {
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

export const updateMatch = async (id: string, data: Partial<MatchInput>) => {
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

export const deleteMatch = async (id: string) => {
    return await matchesRepository.remove(id);
};
