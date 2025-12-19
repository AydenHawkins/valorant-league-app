import prisma from "../../utils/prisma";

// Data access layer for agents
export const findAll = async () => {
    return await prisma.agent.findMany();
};

export const findById = async (id: number) => {
    return await prisma.agent.findUnique({
        where: { id },
    });
};

interface CreateAgentData {
    id: number;
    name: string;
    role: string;
}

export const create = async (data: CreateAgentData) => {
    return await prisma.agent.create({
        data,
    });
};

interface UpdateAgentData {
    name?: string;
    role?: string;
}

export const update = async (id: number, data: UpdateAgentData) => {
    return await prisma.agent.update({
        where: { id },
        data,
    });
};

export const remove = async (id: number) => {
    return await prisma.agent.delete({
        where: { id },
    });
};
