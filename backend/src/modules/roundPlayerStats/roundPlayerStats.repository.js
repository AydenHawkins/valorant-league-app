const prisma = require("../../utils/prisma");

const findAll = async () => {
    return await prisma.roundPlayerStat.findMany();
};

const findById = async (id) => {
    return await prisma.roundPlayerStat.findUnique({
        where: { id: parseInt(id) },
    });
};

const create = async (data) => {
    return await prisma.roundPlayerStat.create({
        data,
    });
};

const update = async (id, data) => {
    return await prisma.roundPlayerStat.update({
        where: { id: parseInt(id) },
        data,
    });
};

const remove = async (id) => {
    return await prisma.roundPlayerStat.delete({
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
