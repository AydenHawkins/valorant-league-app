const prisma = require("../../utils/prisma");

const findAll = async () => {
    return await prisma.plants.findMany();
};

const findById = async (id) => {
    return await prisma.plants.findUnique({
        where: { id: parseInt(id) },
    });
};

const create = async (data) => {
    return await prisma.plants.create({
        data,
    });
};

const update = async (id, data) => {
    return await prisma.plants.update({
        where: { id: parseInt(id) },
        data,
    });
};

const remove = async (id) => {
    return await prisma.plants.delete({
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
