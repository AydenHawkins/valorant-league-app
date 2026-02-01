import * as usersRepository from "./users.repository";

/**
 * Get user profile by ID.
 * @param userId - The ID of the user.
 * @returns The user profile.
 */
export const getUserById = async (
    id: number,
    includePrivate: boolean = false,
) => {
    const user = await usersRepository.findUserById(id, includePrivate);

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

/**
 * Update user profile.
 * @param userId - The ID of the user.
 * @param userData - The data to update the user profile with.
 * @returns The updated user profile.
 */

export const updateUser = async (
    id: number,
    data: {
        username?: string;
        email?: string;
    },
) => {
    const existingUser = await usersRepository.findUserById(id);
    if (!existingUser) {
        throw new Error("User not found");
    }

    return await usersRepository.updateUser(id, data);
};

/**
 * Delete user by ID.
 * @param id - The ID of the user.
 */
export const deleteUser = async (id: number) => {
    const existingUser = await usersRepository.findUserById(id);
    if (!existingUser) {
        throw new Error("User not found");
    }

    return await usersRepository.deleteUser(id);
};

/**
 * Link a user to an existing player using an invite code.
 * @param userId - The ID of the user claiming the player.
 * @param inviteCode - The invite code for the player.
 * @returns The updated user with linked player.
 */
export const linkWithInviteCode = async (userId: number, inviteCode: string) => {
    const user = await usersRepository.findUserById(userId);
    if (!user) {
        throw new Error("User not found");
    }

    if (user.playerId) {
        throw new Error("User is already linked to a player");
    }

    const player = await usersRepository.findPlayerByInviteCode(inviteCode);
    if (!player) {
        throw new Error("Invalid invite code");
    }

    if (player.userId) {
        throw new Error("Player is already linked to an account");
    }

    const updatedUser = await usersRepository.linkUserToPlayer(userId, player.id);
    await usersRepository.clearInviteCode(player.id);

    return updatedUser;
};
