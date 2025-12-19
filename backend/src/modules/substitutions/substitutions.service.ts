import * as substitutionsRepository from "./substitutions.repository";

interface SubstitutionInput {
    matchId: number;
    teamId: number;
    substitutedInId: number;
    substitutedOutId: number;
    timeStamp: Date;
}

export const getAllSubstitutions = async () => {
    return await substitutionsRepository.findAll();
};

export const getSubstitutionById = async (id: string) => {
    return await substitutionsRepository.findById(id);
};

export const createSubstitution = async (data: SubstitutionInput) => {
    const { matchId, teamId, substitutedInId, substitutedOutId, timeStamp } =
        data;
    return await substitutionsRepository.create({
        matchId,
        teamId,
        substitutedInId,
        substitutedOutId,
        timeStamp,
    });
};

export const updateSubstitution = async (id: string, data: Partial<SubstitutionInput>) => {
    const { matchId, teamId, substitutedInId, substitutedOutId, timeStamp } =
        data;
    return await substitutionsRepository.update(id, {
        matchId,
        teamId,
        substitutedInId,
        substitutedOutId,
        timeStamp,
    });
};

export const deleteSubstitution = async (id: string) => {
    return await substitutionsRepository.remove(id);
};
