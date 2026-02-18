import prisma from "../../utils/prisma";

/**
 * Find user by ID with selected fields.
 * @param id - User ID
 * @return User object with selected fields or null if not found
 */

export const findUserById = async (
  id: number,
  includePrivate: boolean = false,
) => {
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

export const updateUser = async (
  id: number,
  data: {
    username?: string;
    email?: string;
  },
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
 * Find player by invite code.
 * @param inviteCode - The invite code
 * @return Player with user relation or null
 */
export const findPlayerByInviteCode = async (inviteCode: string) => {
  return await prisma.player.findUnique({
    where: { inviteCode },
    include: {
      user: true,
    },
  });
};

/**
 * Clear the invite code from a player after successful linking.
 * @param playerId - Player ID
 */
export const clearInviteCode = async (playerId: number) => {
  return await prisma.player.update({
    where: { id: playerId },
    data: { inviteCode: null },
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
