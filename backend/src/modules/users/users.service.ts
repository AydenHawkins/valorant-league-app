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

export const updateUserProfile = async (
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

    //Update the user
    return await usersRepository.updateUserProfile(id, data);
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
