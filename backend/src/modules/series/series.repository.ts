import prisma from "../../utils/prisma";

export const findAll = async () => {
  return await prisma.series.findMany();
};

export const findById = async (id: string) => {
  return await prisma.series.findUnique({
    where: { id: parseInt(id) },
  });
};

interface CreateSeriesData {
  seasonId: number;
  redTeamId: number;
  blueTeamId: number;
  bestOf: number;
  status: string;
  winnerTeamId?: number | null;
  startDate: Date;
  endDate?: Date | null;
}

export const create = async (data: CreateSeriesData) => {
  return await prisma.series.create({
    data,
  });
};

interface UpdateSeriesData {
  seasonId?: number;
  redTeamId?: number;
  blueTeamId?: number;
  bestOf?: number;
  status?: string;
  winnerTeamId?: number | null;
  startDate?: Date;
  endDate?: Date | null;
}

export const update = async (id: string, data: UpdateSeriesData) => {
  return await prisma.series.update({
    where: { id: parseInt(id) },
    data,
  });
};

export const remove = async (id: string) => {
  return await prisma.series.delete({
    where: { id: parseInt(id) },
  });
};
