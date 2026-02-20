import crypto from "crypto";
import * as playersRepository from "./players.repository";
import { isValidPUUID } from "../../utils/validators";

interface PlayerInput {
  name: string;
  tag: string;
  puuid: string;
}

export const getAllPlayers = async () => {
  return await playersRepository.findAll();
};

export const getPlayerById = async (id: string) => {
  return await playersRepository.findById(id);
};

export const getPlayerByPuuid = async (puuid: string) => {
  if (!isValidPUUID(puuid)) {
    throw new Error("Invalid PUUID format");
  }

  return await playersRepository.findByPuuid(puuid);
};

export const createPlayer = async (data: PlayerInput) => {
  const { name, tag, puuid } = data;

  if (!isValidPUUID(puuid)) {
    throw new Error("Invalid PUUID format");
  }

  if (await playersRepository.findByPuuid(puuid)) {
    throw new Error("PUUID_ALREADY_EXISTS");
  }

  return await playersRepository.create({ name, tag, puuid });
};

export const generateInviteCode = async (
  id: string,
): Promise<string | null> => {
  const player = await playersRepository.findById(id);

  if (!player) {
    return null;
  }

  if (player.userId) {
    throw new Error("PLAYER_ALREADY_LINKED");
  }

  const inviteCode = crypto.randomBytes(6).toString("hex");
  await playersRepository.saveInviteCode(id, inviteCode);

  return inviteCode;
};

export const updatePlayer = async (id: string, data: Partial<PlayerInput>) => {
  const { name, tag, puuid } = data;

  if (puuid && !isValidPUUID(puuid)) {
    throw new Error("Invalid PUUID format");
  }

  return await playersRepository.update(id, { name, tag, puuid });
};

export const deletePlayer = async (id: string) => {
  return await playersRepository.remove(id);
};
