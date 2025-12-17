import * as matchParticipationsRepository from "./matchParticipations.repository";

interface MatchParticipationInput {
    matchId: number;
    playerId: number;
    teamId: number;
    teamSide: string;
    agentId?: string;
}

export const getAllMatchParticipations = async () => {
    return await matchParticipationsRepository.findAll();
};

export const getMatchParticipationById = async (id: string) => {
    return await matchParticipationsRepository.findById(id);
};

export const createMatchParticipation = async (data: MatchParticipationInput) => {
    const { matchId, playerId, teamId, teamSide, agentId } = data;
    return await matchParticipationsRepository.create({
        matchId,
        playerId,
        teamId,
        teamSide,
        agentId: agentId ? agentId : null,
    });
};

export const updateMatchParticipation = async (id: string, data: Partial<MatchParticipationInput>) => {
    const { matchId, playerId, teamId, teamSide, agentId } = data;
    return await matchParticipationsRepository.update(id, {
        matchId,
        playerId,
        teamId,
        teamSide,
        agentId,
    });
};

export const deleteMatchParticipation = async (id: string) => {
    return await matchParticipationsRepository.remove(id);
};
