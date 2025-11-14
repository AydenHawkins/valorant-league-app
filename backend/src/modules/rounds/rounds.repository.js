const prisma = require("../../utils/prisma");

const findAll = async () => {
  return await prisma.round.findMany();
};

const findById = async (id) => {
  return await prisma.round.findUnique({
    where: { id: parseInt(id) },
  });
};

const create = async (data) => {
  return await prisma.round.create({
    data,
  });
};

const update = async (id, data) => {
  return await prisma.round.update({
    where: { id: parseInt(id) },
    data,
  });
};

const remove = async (id) => {
  return await prisma.round.delete({
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
