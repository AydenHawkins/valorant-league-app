import prisma from "../../utils/prisma";

interface SeasonData {
  leagueId: number;
  name: string;
  startDate: Date;
  endDate?: Date | null;
}

export const findAll = async () => {
  return await prisma.season.findMany();
};

export const findById = async (id: string) => {
  return await prisma.season.findUnique({
    where: { id: parseInt(id) },
  });
};

export const findByLeagueId = async (leagueId: string) => {
  return await prisma.season.findMany({
    where: { leagueId: parseInt(leagueId) },
  });
};

export const create = async (data: SeasonData) => {
  return await prisma.season.create({
    data,
  });
};

export const createForLeague = async (
  leagueId: string,
  data: Omit<SeasonData, "leagueId">,
) => {
  return await prisma.season.create({
    data: {
      ...data,
      league: { connect: { id: parseInt(leagueId) } },
    },
  });
};

export const update = async (id: string, data: Partial<SeasonData>) => {
  return await prisma.season.update({
    where: { id: parseInt(id) },
    data,
  });
};

export const remove = async (id: string) => {
  return await prisma.season.delete({
    where: { id: parseInt(id) },
  });
};
