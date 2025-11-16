const prisma = require("../../utils/prisma");

const findUserByUsername = async (username) => {
  return await prisma.user.findUnique({
    where: { username },
  });
};

const createUser = async (username, email, hashedPassword) => {
  return await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

module.exports = {
  findUserByUsername,
  createUser,
};
