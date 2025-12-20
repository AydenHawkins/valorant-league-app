import prisma from "../../utils/prisma";

interface RoundTeamStatData {
    roundId: number;
    teamId: number;
    teamSide: string;
    won: boolean;
}

export const findAll = async () => {
    return await prisma.roundTeamStats.findMany();
};

export const findById = async (id: string) => {
    return await prisma.roundTeamStats.findUnique({
        where: { id: parseInt(id) },
    });
};

export const create = async (data: RoundTeamStatData) => {
    return await prisma.roundTeamStats.create({
        data,
    });
};

export const update = async (id: string, data: Partial<RoundTeamStatData>) => {
    return await prisma.roundTeamStats.update({
        where: { id: parseInt(id) },
        data,
    });
};

export const remove = async (id: string) => {
    return await prisma.roundTeamStats.delete({
        where: { id: parseInt(id) },
    });
};
