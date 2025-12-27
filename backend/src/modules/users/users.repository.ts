import prisma from "../../utils/prisma";

/**
 * Find user by ID with selected fields.
 * @param id - User ID
 * @return User object with selected fields or null if not found
 */

export const findUserById = async (id: number) => {
    return await prisma.user.findUnique({
        where: { id },
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
