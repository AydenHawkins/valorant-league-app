const prisma = require("../../utils/prisma");

const findAll = async () => {
    return await prisma.substitution.findMany();
};

const findById = async (id) => {
    return await prisma.substitution.findUnique({
        where: { id: parseInt(id) },
    });
};

const create = async (data) => {
    return await prisma.substitution.create({
        data,
    });
};

const update = async (id, data) => {
    return await prisma.substitution.update({
        where: { id: parseInt(id) },
        data,
    });
};

const remove = async (id) => {
    return await prisma.substitution.delete({
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
