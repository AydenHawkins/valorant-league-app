import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import * as authRepository from "./auth.repository";

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export const signup = async (
  username: string,
  email: string,
  password: string,
) => {
  // Check if user already exists
  const existingUser = await authRepository.findUserByUsername(username);
  if (existingUser) {
    throw new Error("Username already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // Create user
  const user = await authRepository.createUser(username, email, hashedPassword);

  // Generate JWT token
  const token = jwt.sign(
    { userId: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN } as SignOptions,
  );

  return { user, token };
};

export const login = async (username: string, password: string) => {
  // Find user
  const user = await authRepository.findUserByUsername(username);
  if (!user) {
    throw new Error("Invalid credentials");
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN } as SignOptions,
  );

  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      player: user.player,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    token,
  };
};
