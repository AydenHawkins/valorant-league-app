const prisma = require("../../utils/prisma");

const findAll = async () => {
    return await prisma.match.findMany();
};

const findById = async (id) => {
    return await prisma.match.findUnique({
        where: { id: parseInt(id) },
    });
};

const create = async (data) => {
    return await prisma.match.create({
        data,
    });
};

const update = async (id, data) => {
    return await prisma.match.update({
        where: { id: parseInt(id) },
        data,
    });
};

const remove = async (id) => {
    return await prisma.match.delete({
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
