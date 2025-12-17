import prisma from "../../utils/prisma";

interface PlayerData {
    name: string;
    tag: string;
    puuid: string;
}

export const findAll = async () => {
    return await prisma.player.findMany();
};

export const findById = async (id: string) => {
    return await prisma.player.findUnique({
        where: { id: parseInt(id) },
    });
};

export const create = async (data: PlayerData) => {
    return await prisma.player.create({
        data,
    });
};

export const update = async (id: string, data: Partial<PlayerData>) => {
    return await prisma.player.update({
        where: { id: parseInt(id) },
        data,
    });
};

export const remove = async (id: string) => {
    return await prisma.player.delete({
        where: { id: parseInt(id) },
    });
};
