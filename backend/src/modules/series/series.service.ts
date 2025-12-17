import * as seriesRepository from "./series.repository";

export const getAllSeries = async () => {
    return await seriesRepository.findAll();
};

export const getSeriesById = async (id: string) => {
    return await seriesRepository.findById(id);
};

interface CreateSeriesInput {
    seasonId: number;
    redTeamId: number;
    blueTeamId: number;
    bestOf: number;
    status: string;
    winnerTeamId?: number | null;
    startDate: Date;
    endDate?: Date | null;
}

export const createSeries = async (data: CreateSeriesInput) => {
    const {
        seasonId,
        redTeamId,
        blueTeamId,
        bestOf,
        status,
        winnerTeamId,
        startDate,
        endDate,
    } = data;
    return await seriesRepository.create({
        seasonId,
        redTeamId,
        blueTeamId,
        bestOf,
        status,
        winnerTeamId,
        startDate,
        endDate: endDate ? endDate : null,
    });
};

interface UpdateSeriesInput {
    seasonId?: number;
    redTeamId?: number;
    blueTeamId?: number;
    bestOf?: number;
    status?: string;
    winnerTeamId?: number | null;
    startDate?: Date;
    endDate?: Date | null;
}

export const updateSeries = async (id: string, data: UpdateSeriesInput) => {
    const {
        seasonId,
        redTeamId,
        blueTeamId,
        bestOf,
        status,
        winnerTeamId,
        startDate,
        endDate,
    } = data;
    return await seriesRepository.update(id, {
        seasonId,
        redTeamId,
        blueTeamId,
        bestOf,
        status,
        winnerTeamId,
        startDate,
        endDate,
    });
};

export const deleteSeries = async (id: string) => {
    return await seriesRepository.remove(id);
};
