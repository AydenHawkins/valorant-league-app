import prisma from "../../utils/prisma";

export const findAll = async () => {
  return await prisma.league.findMany();
};

export const findById = async (id: string) => {
  return await prisma.league.findUnique({
    where: { id: parseInt(id) },
  });
};

interface CreateLeagueData {
  name: string;
}

export const create = async (data: CreateLeagueData) => {
  return await prisma.league.create({
    data,
  });
};

interface UpdateLeagueData {
  name?: string;
}

export const update = async (id: string, data: UpdateLeagueData) => {
  return await prisma.league.update({
    where: { id: parseInt(id) },
    data,
  });
};

export const remove = async (id: string) => {
  return await prisma.league.delete({
    where: { id: parseInt(id) },
  });
};
