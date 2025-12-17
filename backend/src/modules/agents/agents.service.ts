import * as agentsRepository from "./agents.repository";

// Business logic for agents
export const getAllAgents = async () => {
    return await agentsRepository.findAll();
};

export const getAgentById = async (id: number) => {
    return await agentsRepository.findById(id);
};

interface CreateAgentInput {
    id: number;
    name: string;
    role: string;
}

export const createAgent = async (data: CreateAgentInput) => {
    const { id, name, role } = data;
    return await agentsRepository.create({ id, name, role });
};

interface UpdateAgentInput {
    name?: string;
    role?: string;
}

export const updateAgent = async (id: number, data: UpdateAgentInput) => {
    const { name, role } = data;
    return await agentsRepository.update(id, { name, role });
};

export const deleteAgent = async (id: number) => {
    return await agentsRepository.remove(id);
};
