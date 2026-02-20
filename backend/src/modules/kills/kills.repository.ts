import prisma from "../../utils/prisma";

export const findAll = async () => {
  return await prisma.kill.findMany();
};

export const findById = async (id: string) => {
  return await prisma.kill.findUnique({
    where: { id: parseInt(id) },
  });
};

interface CreateKillData {
  matchId: number;
  roundNumber: number;
  timeInRoundMs: number;
  timeInMatchMs: number;
  killerId: number;
  victimId: number;
  locationX?: number | null;
  locationY?: number | null;
  weaponId?: string | null;
  weaponName?: string | null;
  weaponType?: string | null;
  secondaryFireMode?: boolean;
}

export const create = async (data: CreateKillData) => {
  return await prisma.kill.create({
    data,
  });
};

interface UpdateKillData {
  matchId?: number;
  roundNumber?: number;
  timeInRoundMs?: number;
  timeInMatchMs?: number;
  killerId?: number;
  vicitimId?: number;
  locationX?: number | null;
  locationY?: number | null;
  weaponId?: string | null;
  weaponName?: string | null;
  weaponType?: string | null;
  secondaryFireMode?: boolean;
}

export const update = async (id: string, data: UpdateKillData) => {
  return await prisma.kill.update({
    where: { id: parseInt(id) },
    data,
  });
};

export const remove = async (id: string) => {
  return await prisma.kill.delete({
    where: { id: parseInt(id) },
  });
};
