import prisma from "../../utils/prisma";

interface PlantData {
    roundId: number;
    playerId: number;
    roundTimeMs: number;
    site: string;
    locationX?: number | null;
    locationY?: number | null;
}

export const findAll = async () => {
    return await prisma.plants.findMany();
};

export const findById = async (id: string) => {
    return await prisma.plants.findUnique({
        where: { id: parseInt(id) },
    });
};

export const create = async (data: PlantData) => {
    return await prisma.plants.create({
        data,
    });
};

export const update = async (id: string, data: Partial<PlantData>) => {
    return await prisma.plants.update({
        where: { id: parseInt(id) },
        data,
    });
};

export const remove = async (id: string) => {
    return await prisma.plants.delete({
        where: { id: parseInt(id) },
    });
};
