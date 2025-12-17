import * as plantsRepository from "./plants.repository";

interface PlantInput {
    roundId: number;
    playerId: number;
    roundTimeMs: number;
    site: string;
    locationX?: number;
    locationY?: number;
}

export const getAllPlants = async () => {
    return await plantsRepository.findAll();
};

export const getPlantById = async (id: string) => {
    return await plantsRepository.findById(id);
};

export const createPlant = async (data: PlantInput) => {
    const { roundId, playerId, roundTimeMs, site, locationX, locationY } = data;
    return await plantsRepository.create({
        roundId,
        playerId,
        roundTimeMs,
        site,
        locationX: locationX ? locationX : null,
        locationY: locationY ? locationY : null,
    });
};

export const updatePlant = async (id: string, data: Partial<PlantInput>) => {
    const { roundId, playerId, roundTimeMs, site, locationX, locationY } = data;
    return await plantsRepository.update(id, {
        roundId,
        playerId,
        roundTimeMs,
        site,
        locationX,
        locationY,
    });
};

export const deletePlant = async (id: string) => {
    return await plantsRepository.remove(id);
};
