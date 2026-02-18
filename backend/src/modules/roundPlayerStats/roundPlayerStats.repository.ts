import prisma from "../../utils/prisma";

interface RoundPlayerStatData {
  roundId: number;
  matchParticipationId: number;
  playerId: number;
  score: number;
  kills: number;
  headshots: number;
  bodyshots: number;
  legshots: number;
  grenadeCasts?: number | null;
  ability1Casts?: number | null;
  ability2Casts?: number | null;
  ultimateCasts?: number | null;
  loadoutValue?: number | null;
  creditsRemaining?: number | null;
  weaponId?: string | null;
  weaponName?: string | null;
  armorId?: string | null;
  armorName?: string | null;
}

export const findAll = async () => {
  return await prisma.roundPlayerStats.findMany();
};

export const findById = async (id: string) => {
  return await prisma.roundPlayerStats.findUnique({
    where: { id: parseInt(id) },
  });
};

export const create = async (data: RoundPlayerStatData) => {
  return await prisma.roundPlayerStats.create({
    data,
  });
};

export const update = async (
  id: string,
  data: Partial<RoundPlayerStatData>,
) => {
  return await prisma.roundPlayerStats.update({
    where: { id: parseInt(id) },
    data,
  });
};

export const remove = async (id: string) => {
  return await prisma.roundPlayerStats.delete({
    where: { id: parseInt(id) },
  });
};
