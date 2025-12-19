import prisma from "../../utils/prisma";

interface MatchData {
    seriesId: number;
    matchNumber: number;
    riotMatchId: string;
    mapId: string;
    gameLengthMs?: number | null;
    startedAt: Date;
    completedAt?: Date | null;
    isCompleted: boolean;
    status: string;
    winnerTeamSide?: string | null;
}

export const findAll = async () => {
    return await prisma.match.findMany();
};

export const findById = async (id: string) => {
    return await prisma.match.findUnique({
        where: { id: parseInt(id) },
    });
};

export const create = async (data: MatchData) => {
    return await prisma.match.create({
        data,
    });
};

export const update = async (id: string, data: Partial<MatchData>) => {
    return await prisma.match.update({
        where: { id: parseInt(id) },
        data,
    });
};

export const remove = async (id: string) => {
    return await prisma.match.delete({
        where: { id: parseInt(id) },
    });
};
