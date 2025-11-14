const prisma = require("../../utils/prisma");

const findAll = async () => {
    return await prisma.roster.findMany();
};

const findById = async (id) => {
    return await prisma.roster.findUnique({
        where: { id: parseInt(id) },
    });
};

const create = async (data) => {
    return await prisma.roster.create({
        data,
    });
};

const update = async (id, data) => {
    return await prisma.roster.update({
        where: { id: parseInt(id) },
        data,
    });
};

const remove = async (id) => {
    return await prisma.roster.delete({
        where: { id: parseInt(id) },
    });
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};
