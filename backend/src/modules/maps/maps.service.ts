import * as mapsRepository from "./maps.repository";

export interface CreateMapInput {
    id: string;
    name: string;
}

export interface UpdateMapInput {
    name?: string;
}

export const getAllMaps = async () => {
    return await mapsRepository.findAll();
};

export const getMapById = async (id: string) => {
    return await mapsRepository.findById(id);
};

export const createMap = async (data: CreateMapInput) => {
    const { id, name } = data;
    return await mapsRepository.create({ id, name });
};

export const updateMap = async (id: string, data: UpdateMapInput) => {
    const { name } = data;
    return await mapsRepository.update(id, { name });
};

export const deleteMap = async (id: string) => {
    return await mapsRepository.remove(id);
};
