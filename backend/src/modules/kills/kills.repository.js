const prisma = require("../../utils/prisma");

const findAll = async () => {
    return await prisma.kill.findMany();
};

const findById = async (id) => {
    return await prisma.kill.findUnique({
        where: { id: parseInt(id) },
    });
};

const create = async (data) => {
    return await prisma.kill.create({
        data,
    });
};

const update = async (id, data) => {
    return await prisma.kill.update({
        where: { id: parseInt(id) },
        data,
    });
};

const remove = async (id) => {
    return await prisma.kill.delete({
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
