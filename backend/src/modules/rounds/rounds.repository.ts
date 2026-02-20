import prisma from "../../utils/prisma";

interface RoundData {
  matchId: number;
  roundNumber: number;
  result: string;
  winningTeam: string;
}

export const findAll = async () => {
  return await prisma.round.findMany();
};

export const findById = async (id: string) => {
  return await prisma.round.findUnique({
    where: { id: parseInt(id) },
  });
};

export const create = async (data: RoundData) => {
  return await prisma.round.create({
    data,
  });
};

export const update = async (id: string, data: Partial<RoundData>) => {
  return await prisma.round.update({
    where: { id: parseInt(id) },
    data,
  });
};

export const remove = async (id: string) => {
  return await prisma.round.delete({
    where: { id: parseInt(id) },
  });
};
