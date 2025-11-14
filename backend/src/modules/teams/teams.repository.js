const prisma = require("../../utils/prisma");

const findAll = async () => {
    return await prisma.team.findMany();
};

const findById = async (id) => {
    return await prisma.team.findUnique({
        where: { id: parseInt(id) },
    });
};

const create = async (data) => {
    return await prisma.team.create({
        data,
    });
};

const update = async (id, data) => {
    return await prisma.team.update({
        where: { id: parseInt(id) },
        data,
    });
};

const remove = async (id) => {
    return await prisma.team.delete({
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
