import prisma from "../../utils/prisma";

interface SubstitutionData {
    matchId: number;
    teamId: number;
    substitutedInId: number;
    substitutedOutId: number;
    timeStamp: Date;
}

export const findAll = async () => {
    return await prisma.substitution.findMany();
};

export const findById = async (id: string) => {
    return await prisma.substitution.findUnique({
        where: { id: parseInt(id) },
    });
};

export const create = async (data: SubstitutionData) => {
    return await prisma.substitution.create({
        data,
    });
};

export const update = async (id: string, data: Partial<SubstitutionData>) => {
    return await prisma.substitution.update({
        where: { id: parseInt(id) },
        data,
    });
};

export const remove = async (id: string) => {
    return await prisma.substitution.delete({
        where: { id: parseInt(id) },
    });
};
