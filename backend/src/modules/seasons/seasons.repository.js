const prisma = require("../../utils/prisma");

const findAll = async () => {
    return await prisma.season.findMany();
};

const findById = async (id) => {
    return await prisma.season.findUnique({
        where: { id: parseInt(id) },
    });
};

const findByLeagueId = async (leagueId) => {
    return await prisma.season.findMany({
        where: { leagueId: parseInt(leagueId) },
    });
};

const create = async (data) => {
    return await prisma.season.create({
        data,
    });
};

const createForLeague = async (leagueId, data) => {
    return await prisma.season.create({
        data: {
            ...data,
            league: { connect: { id: parseInt(leagueId) } },
        },
    });
};

const update = async (id, data) => {
    return await prisma.season.update({
        where: { id: parseInt(id) },
        data,
    });
};

const remove = async (id) => {
    return await prisma.season.delete({
        where: { id: parseInt(id) },
    });
};

module.exports = {
    findAll,
    findById,
    findByLeagueId,
    create,
    createForLeague,
    update,
    remove,
};
