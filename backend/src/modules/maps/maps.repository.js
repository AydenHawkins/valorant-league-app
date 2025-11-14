const prisma = require("../../utils/prisma");

const findAll = async () => {
    return await prisma.map.findMany();
};

const findById = async (id) => {
    return await prisma.map.findUnique({
        where: { id: Number(id) },
    });
};

const create = async (data) => {
    return await prisma.map.create({
        data,
    });
};

const update = async (id, data) => {
    return await prisma.map.update({
        where: { id },
        data,
    });
};

const remove = async (id) => {
    return await prisma.map.delete({
        where: { id },
    });
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};
