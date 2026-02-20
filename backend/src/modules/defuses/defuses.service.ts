import * as defusesRepository from "./defuses.repository";

export const getAllDefuses = async () => {
  return await defusesRepository.findAll();
};

export const getDefuseById = async (id: string) => {
  return await defusesRepository.findById(id);
};

interface CreateDefuseInput {
  roundId: number;
  playerId: number;
  roundTimeMs: number;
  locationX?: number | null;
  locationY?: number | null;
}

export const createDefuse = async (data: CreateDefuseInput) => {
  const { roundId, playerId, roundTimeMs, locationX, locationY } = data;
  return await defusesRepository.create({
    roundId,
    playerId,
    roundTimeMs,
    locationX: locationX ? locationX : null,
    locationY: locationY ? locationY : null,
  });
};

interface UpdateDefuseInput {
  roundId?: number;
  playerId?: number;
  roundTimeMs?: number;
  locationX?: number | null;
  locationY?: number | null;
}

export const updateDefuse = async (id: string, data: UpdateDefuseInput) => {
  const { roundId, playerId, roundTimeMs, locationX, locationY } = data;
  return await defusesRepository.update(id, {
    roundId,
    playerId,
    roundTimeMs,
    locationX,
    locationY,
  });
};

export const deleteDefuse = async (id: string) => {
  return await defusesRepository.remove(id);
};
