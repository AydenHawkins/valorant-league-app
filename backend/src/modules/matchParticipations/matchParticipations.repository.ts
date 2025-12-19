import prisma from "../../utils/prisma";

interface MatchParticipationData {
    matchId: number;
    playerId: number;
    teamId: number;
    teamSide: string;
    agentId?: string | null;
}

export const findAll = async () => {
    return await prisma.matchParticipation.findMany();
};

export const findById = async (id: string) => {
    return await prisma.matchParticipation.findUnique({
        where: { id: parseInt(id) },
    });
};

export const create = async (data: MatchParticipationData) => {
    return await prisma.matchParticipation.create({
        data,
    });
};

export const update = async (id: string, data: Partial<MatchParticipationData>) => {
    return await prisma.matchParticipation.update({
        where: { id: parseInt(id) },
        data,
    });
};

export const remove = async (id: string) => {
    return await prisma.matchParticipation.delete({
        where: { id: parseInt(id) },
    });
};
