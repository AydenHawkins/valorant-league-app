import prisma from "../../utils/prisma";

export const findAll = async () => {
    return await prisma.defuse.findMany();
};

export const findById = async (id: string) => {
    return await prisma.defuse.findUnique({
        where: { id: parseInt(id) },
    });
};

interface CreateDefuseData {
    roundId: number;
    playerId: number;
    roundTimeMs: number;
    locationX?: number | null;
    locationY?: number | null;
}

export const create = async (data: CreateDefuseData) => {
    return await prisma.defuse.create({
        data,
    });
};

interface UpdateDefuseData {
    roundId?: number;
    playerId?: number;
    roundTimeMs?: number;
    locationX?: number | null;
    locationY?: number | null;
}

export const update = async (id: string, data: UpdateDefuseData) => {
    return await prisma.defuse.update({
        where: { id: parseInt(id) },
        data,
    });
};

export const remove = async (id: string) => {
    return await prisma.defuse.delete({
        where: { id: parseInt(id) },
    });
};
