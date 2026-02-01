import prisma from "../../utils/prisma";

/**
 * Find user by ID with selected fields.
 * @param id - User ID
 * @return User object with selected fields or null if not found
 */

export const findUserById = async (id: number, includePrivate: boolean = false) => {
    return await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            username: true,
            ...(includePrivate && { email: true }),
            role: true,
            playerId: true,
            player: {
                select: {
                    id: true,
                    name: true,
                    tag: true,
                    puuid: true,
                },
            },
            createdAt: true,
            updatedAt: true,
        },
    });
};

/**
 * Update user profile.
 * @param id - User ID
 * @param data - Data to update
 * @return Updated user object with selected fields
 */

export const updateUserProfile = async (
    id: number,
    data: {
        username?: string;
        email?: string;
    }
) => {
    return await prisma.user.update({
        where: { id },
        data,
        select: {
            id: true,
            username: true,
            email: true,
            role: true,
            playerId: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

/**
 * Delete user by ID.
 * @param id - User ID
 */
export const deleteUser = async (id: number) => {
    return await prisma.user.delete({
        where: { id },
    });
};

/**
 * Find player by PUUID.
 */
export const findPlayerByPUUID = async (puuid: string) => {
    return await prisma.player.findUnique({
        where: { puuid },
        include: {
            user: true,
        },
    });
};

/**
 * Create a new player or update existing one.
 */
export const upsertPlayer = async (data: {
    puuid: string;
    name: string;
    tag: string;
}) => {
    return await prisma.player.upsert({
        where: { puuid: data.puuid },
        update: {
            name: data.name,
            tag: data.tag,
        },
        create: {
            puuid: data.puuid,
            name: data.name,
            tag: data.tag,
        },
    });
};

/**
 * Link user to player (Riot account)
 */
export const linkUserToPlayer = async (userId: number, playerId: number) => {
    return await prisma.user.update({
        where: { id: userId },
        data: { playerId: playerId },
        select: {
            id: true,
            username: true,
            email: true,
            role: true,
            playerId: true,
            player: {
                select: {
                    id: true,
                    name: true,
                    tag: true,
                    puuid: true,
                },
            },
            createdAt: true,
            updatedAt: true,
        },
    });
};
