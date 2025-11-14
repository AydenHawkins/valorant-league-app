const prisma = require("../../utils/prisma");

const findAll = async () => {
  return await prisma.roundTeamStat.findMany();
};

const findById = async (id) => {
  return await prisma.roundTeamStat.findUnique({
    where: { id: parseInt(id) },
  });
};

const create = async (data) => {
  return await prisma.roundTeamStat.create({
    data,
  });
};

const update = async (id, data) => {
  return await prisma.roundTeamStat.update({
    where: { id: parseInt(id) },
    data,
  });
};

const remove = async (id) => {
  return await prisma.roundTeamStat.delete({
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
