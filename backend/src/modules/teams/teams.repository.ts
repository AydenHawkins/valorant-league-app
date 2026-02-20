import prisma from "../../utils/prisma";

interface TeamData {
  name: string;
  owner: string;
}

export const findAll = async () => {
  return await prisma.team.findMany();
};

export const findById = async (id: string) => {
  return await prisma.team.findUnique({
    where: { id: parseInt(id) },
  });
};

export const create = async (data: TeamData) => {
  return await prisma.team.create({
    data: {
      name: data.name,
      owner: {
        connect: { id: parseInt(data.owner) },
      },
    },
  });
};

export const update = async (id: string, data: Partial<TeamData>) => {
  const { owner, ...rest } = data;
  const updateData: Omit<Partial<TeamData>, "owner"> & {
    owner?: { connect: { id: number } };
  } = { ...rest };
  if (owner) {
    updateData.owner = {
      connect: { id: parseInt(owner) },
    };
  }
  return await prisma.team.update({
    where: { id: parseInt(id) },
    data: updateData,
  });
};

export const remove = async (id: string) => {
  return await prisma.team.delete({
    where: { id: parseInt(id) },
  });
};
