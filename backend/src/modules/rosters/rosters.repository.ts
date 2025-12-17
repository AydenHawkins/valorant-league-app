import prisma from "../../utils/prisma";

export const findAll = async () => {
    return await prisma.roster.findMany();
};

export const findById = async (id: string) => {
    return await prisma.roster.findUnique({
        where: { id: parseInt(id) },
    });
};

interface CreateRosterData {
    teamId: number;
    playerId: number;
    seasonId: number;
    startDate: Date;
    endDate?: Date | null;
}

export const create = async (data: CreateRosterData) => {
    return await prisma.roster.create({
        data,
    });
};

interface UpdateRosterData {
    teamId?: number;
    playerId?: number;
    seasonId?: number;
    startDate?: Date;
    endDate?: Date | null;
}

export const update = async (id: string, data: UpdateRosterData) => {
    return await prisma.roster.update({
        where: { id: parseInt(id) },
        data,
    });
};

export const remove = async (id: string) => {
    return await prisma.roster.delete({
        where: { id: parseInt(id) },
    });
};
