const prisma = require("../../utils/prisma");

const findAll = async () => {
  return await prisma.defuse.findMany();
};

const findById = async (id) => {
  return await prisma.defuse.findUnique({
    where: { id: parseInt(id) },
  });
};

const create = async (data) => {
  return await prisma.defuse.create({
    data,
  });
};

const update = async (id, data) => {
  return await prisma.defuse.update({
    where: { id: parseInt(id) },
    data,
  });
};

const remove = async (id) => {
  return await prisma.defuse.delete({
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
