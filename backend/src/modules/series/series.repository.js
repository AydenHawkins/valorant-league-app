const prisma = require("../../utils/prisma");

const findAll = async () => {
    return await prisma.series.findMany();
};

const findById = async (id) => {
    return await prisma.series.findUnique({
        where: { id: parseInt(id) },
    });
};

const create = async (data) => {
    return await prisma.series.create({
        data,
    });
};

const update = async (id, data) => {
    return await prisma.series.update({
        where: { id: parseInt(id) },
        data,
    });
};

const remove = async (id) => {
    return await prisma.series.delete({
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
