const prisma = require("../../utils/prisma");

// Data access layer for agents
const findAll = async () => {
  return await prisma.agent.findMany();
};

const findById = async (id) => {
  return await prisma.agent.findUnique({
    where: { id },
  });
};

const create = async (data) => {
  return await prisma.agent.create({
    data,
  });
};

const update = async (id, data) => {
  return await prisma.agent.update({
    where: { id },
    data,
  });
};

const remove = async (id) => {
  return await prisma.agent.delete({
    where: { id },
  });
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
