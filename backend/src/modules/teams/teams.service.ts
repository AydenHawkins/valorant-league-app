import * as teamsRepository from "./teams.repository";

interface TeamInput {
  name: string;
  owner: string;
}

export const getAllTeams = async () => {
  return await teamsRepository.findAll();
};

export const getTeamById = async (id: string) => {
  return await teamsRepository.findById(id);
};

export const createTeam = async (data: TeamInput) => {
  const { name, owner } = data;
  return await teamsRepository.create({ name, owner });
};

export const updateTeam = async (id: string, data: Partial<TeamInput>) => {
  const { name } = data;
  return await teamsRepository.update(id, { name });
};

export const deleteTeam = async (id: string) => {
  return await teamsRepository.remove(id);
};
