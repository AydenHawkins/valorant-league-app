import * as rostersRepository from "./rosters.repository";

export const getAllRosters = async () => {
  return await rostersRepository.findAll();
};

export const getRosterById = async (id: string) => {
  return await rostersRepository.findById(id);
};

interface CreateRosterInput {
  teamId: number;
  playerId: number;
  seasonId: number;
  startDate: Date;
  endDate?: Date | null;
}

export const createRoster = async (data: CreateRosterInput) => {
  const { teamId, playerId, seasonId, startDate, endDate } = data;
  return await rostersRepository.create({
    teamId,
    playerId,
    seasonId,
    startDate,
    endDate: endDate ? endDate : null,
  });
};

interface UpdateRosterInput {
  teamId?: number;
  playerId?: number;
  seasonId?: number;
  startDate?: Date;
  endDate?: Date | null;
}

export const updateRoster = async (id: string, data: UpdateRosterInput) => {
  const { teamId, playerId, seasonId, startDate, endDate } = data;
  return await rostersRepository.update(id, {
    teamId,
    playerId,
    seasonId,
    startDate,
    endDate,
  });
};

export const deleteRoster = async (id: string) => {
  return await rostersRepository.remove(id);
};
