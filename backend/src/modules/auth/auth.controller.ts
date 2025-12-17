import { Request, Response } from "express";
import * as authService from "./auth.service";

export const signupController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            res.status(400).json({
                error: "Username, email, and password are required",
            });
            return;
        }

        if (username.length < 3) {
            res.status(400).json({
                error: "Username must be at least 3 characters long",
            });
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            res.status(400).json({ error: "Invalid email format" });
            return;
        }

        if (password.length < 6) {
            res.status(400).json({
                error: "Password must be at least 6 characters long",
            });
            return;
        }

        const result = await authService.signup(username, email, password);

        // Set HTTP-only cookie
        res.cookie("token", result.token, {
            httpOnly: true, // Cannot be accessed by JavaScript
            secure: false, // Allow HTTP in development
            sameSite: "lax", // Less strict for development
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(201).json({
            message: "User created successfully",
            user: result.user,
            // No token in response body
        });
    } catch (error) {
        if (error instanceof Error && error.message === "Username already exists") {
            res.status(409).json({ error: error.message });
            return;
        }
        console.error("Signup error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const loginController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            res.status(400).json({
                error: "Username and password are required",
            });
            return;
        }

        const result = await authService.login(username, password);

        // Set HTTP-only cookie
        res.cookie("token", result.token, {
            httpOnly: true, // Cannot be accessed by JavaScript
            secure: false, // Allow HTTP in development
            sameSite: "lax", // Less strict for development
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(200).json({
            message: "Login successful",
            user: result.user,
            // No token in response body
        });
    } catch (error) {
        if (error instanceof Error && error.message === "Invalid credentials") {
            res.status(401).json({ error: error.message });
            return;
        }
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const logoutController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        // Clear the token cookie
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.status(200).json({
            message: "Logout successful",
        });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
