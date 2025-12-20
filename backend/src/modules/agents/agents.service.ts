import * as agentsRepository from "./agents.repository";

// Business logic for agents
export const getAllAgents = async () => {
    return await agentsRepository.findAll();
};

export const getAgentById = async (id: string) => {
    return await agentsRepository.findById(id);
};

interface CreateAgentInput {
    id: string;
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

export const updateAgent = async (id: string, data: UpdateAgentInput) => {
    const { name, role } = data;
    return await agentsRepository.update(id, { name, role });
};

export const deleteAgent = async (id: string) => {
    return await agentsRepository.remove(id);
};
