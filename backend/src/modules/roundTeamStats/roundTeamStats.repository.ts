import prisma from "../../utils/prisma";

interface RoundTeamStatData {
    roundId: number;
    teamId: number;
    teamSide: string;
    won: boolean;
}

export const findAll = async () => {
    return await prisma.roundTeamStat.findMany();
};

export const findById = async (id: string) => {
    return await prisma.roundTeamStat.findUnique({
        where: { id: parseInt(id) },
    });
};

export const create = async (data: RoundTeamStatData) => {
    return await prisma.roundTeamStat.create({
        data,
    });
};

export const update = async (id: string, data: Partial<RoundTeamStatData>) => {
    return await prisma.roundTeamStat.update({
        where: { id: parseInt(id) },
        data,
    });
};

export const remove = async (id: string) => {
    return await prisma.roundTeamStat.delete({
        where: { id: parseInt(id) },
    });
};
