import * as mapsRepository from "./maps.repository";

export const getAllMaps = async () => {
    return await mapsRepository.findAll();
};

export const getMapById = async (id: string) => {
    return await mapsRepository.findById(id);
};

export const createMap = async (data: { id: string; name: string }) => {
    const { id, name } = data;
    return await mapsRepository.create({ id, name });
};

export const updateMap = async (id: string, data: { name?: string }) => {
    const { name } = data;
    return await mapsRepository.update(id, { name });
};

export const deleteMap = async (id: string) => {
    return await mapsRepository.remove(id);
};
