const prisma = require("../../utils/prisma");

const findAll = async () => {
    return await prisma.league.findMany();
};

const findById = async (id) => {
    return await prisma.league.findUnique({
        where: { id: parseInt(id) },
    });
};

const create = async (data) => {
    return await prisma.league.create({
        data,
    });
};

const update = async (id, data) => {
    return await prisma.league.update({
        where: { id: parseInt(id) },
        data,
    });
};

const remove = async (id) => {
    return await prisma.league.delete({
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
