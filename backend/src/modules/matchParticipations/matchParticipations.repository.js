const prisma = require("../../utils/prisma");

const findAll = async () => {
  return await prisma.matchParticipation.findMany();
};

const findById = async (id) => {
  return await prisma.matchParticipation.findUnique({
    where: { id: parseInt(id) },
  });
};

const create = async (data) => {
  return await prisma.matchParticipation.create({
    data,
  });
};

const update = async (id, data) => {
  return await prisma.matchParticipation.update({
    where: { id: parseInt(id) },
    data,
  });
};

const remove = async (id) => {
  return await prisma.matchParticipation.delete({
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
