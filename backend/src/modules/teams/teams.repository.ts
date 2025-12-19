import prisma from "../../utils/prisma";

interface TeamData {
    name: string;
}

export const findAll = async () => {
    return await prisma.team.findMany();
};

export const findById = async (id: string) => {
    return await prisma.team.findUnique({
        where: { id: parseInt(id) },
    });
};

export const create = async (data: TeamData) => {
    return await prisma.team.create({
        data,
    });
};

export const update = async (id: string, data: Partial<TeamData>) => {
    return await prisma.team.update({
        where: { id: parseInt(id) },
        data,
    });
};

export const remove = async (id: string) => {
    return await prisma.team.delete({
        where: { id: parseInt(id) },
    });
};
