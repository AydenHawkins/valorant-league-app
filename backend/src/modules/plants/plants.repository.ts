import prisma from "../../utils/prisma";

interface PlantData {
  roundId: number;
  playerId: number;
  roundTimeMs: number;
  site: string;
  locationX?: number | null;
  locationY?: number | null;
}

export const findAll = async () => {
  return await prisma.plant.findMany();
};

export const findById = async (id: string) => {
  return await prisma.plant.findUnique({
    where: { id: parseInt(id) },
  });
};

export const create = async (data: PlantData) => {
  return await prisma.plant.create({
    data,
  });
};

export const update = async (id: string, data: Partial<PlantData>) => {
  return await prisma.plant.update({
    where: { id: parseInt(id) },
    data,
  });
};

export const remove = async (id: string) => {
  return await prisma.plant.delete({
    where: { id: parseInt(id) },
  });
};
