import * as leaguesRepository from "./leagues.repository";

export const getAllLeagues = async () => {
    return await leaguesRepository.findAll();
};

export const getLeagueById = async (id: string) => {
    return await leaguesRepository.findById(id);
};

interface CreateLeagueInput {
    name: string;
}

export const createLeague = async (data: CreateLeagueInput) => {
    const { name } = data;
    return await leaguesRepository.create({ name });
};

interface UpdateLeagueInput {
    name?: string;
}

export const updateLeague = async (id: string, data: UpdateLeagueInput) => {
    const { name } = data;
    return await leaguesRepository.update(id, { name });
};

export const deleteLeague = async (id: string) => {
    return await leaguesRepository.remove(id);
};
