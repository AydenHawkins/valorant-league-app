const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByUsername, createUser } = require("./auth.repository");

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

const signup = async (username, email, password) => {
    // Check if user already exists
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
        throw new Error("Username already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create user
    const user = await createUser(username, email, hashedPassword);

    // Generate JWT token
    const token = jwt.sign(
        { userId: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );

    return { user, token };
};

const login = async (username, password) => {
    // Find user
    const user = await findUserByUsername(username);
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
        { userId: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );

    return {
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        },
        token,
    };
};

module.exports = {
    signup,
    login,
};
