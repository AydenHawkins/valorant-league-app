const prisma = require("../../utils/prisma");

const findAll = async () => {
  return await prisma.player.findMany();
};

const findById = async (id) => {
  return await prisma.player.findUnique({
    where: { id: parseInt(id) },
  });
};

const create = async (data) => {
  return await prisma.player.create({
    data,
  });
};

const update = async (id, data) => {
  return await prisma.player.update({
    where: { id: parseInt(id) },
    data,
  });
};

const remove = async (id) => {
  return await prisma.player.delete({
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
