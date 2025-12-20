import prisma from "../../utils/prisma";

export const findAll = async () => {
    return await prisma.map.findMany();
};

export const findById = async (id: string) => {
    return await prisma.map.findUnique({
        where: { id },
    });
};

export const create = async (data: { id: string; name: string }) => {
    return await prisma.map.create({
        data,
    });
};

export const update = async (id: string, data: { name?: string }) => {
    return await prisma.map.update({
        where: { id },
        data,
    });
};

export const remove = async (id: string) => {
    return await prisma.map.delete({
        where: { id },
    });
};
