import * as seasonsRepository from "./seasons.repository";

interface SeasonInput {
    name: string;
    startDate: Date;
    endDate?: Date;
}

export const getAllSeasons = async () => {
    return await seasonsRepository.findAll();
};

export const getSeasonById = async (id: string) => {
    return await seasonsRepository.findById(id);
};

export const getSeasonsForLeague = async (leagueId: string) => {
    return await seasonsRepository.findByLeagueId(leagueId);
};

export const createSeason = async (leagueId: number, data: SeasonInput) => {
    const { name, startDate, endDate } = data;
    return await seasonsRepository.create({
        leagueId,
        name,
        startDate,
        endDate: endDate ? endDate : null,
    });
};

export const createSeasonForLeague = async (leagueId: string, data: SeasonInput) => {
    const { name, startDate, endDate } = data;
    return await seasonsRepository.createForLeague(leagueId, {
        name,
        startDate,
        endDate,
    });
};

export const updateSeason = async (id: string, data: Partial<SeasonInput>) => {
    const { name, startDate, endDate } = data;
    return await seasonsRepository.update(id, { name, startDate, endDate });
};

export const deleteSeason = async (id: string) => {
    return await seasonsRepository.remove(id);
};
