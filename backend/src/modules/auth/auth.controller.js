const { signup, login } = require("./auth.service");

const signupController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res
                .status(400)
                .json({ error: "Username, email, and password are required" });
        }

        if (username.length < 3) {
            return res
                .status(400)
                .json({ error: "Username must be at least 3 characters long" });
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        if (password.length < 6) {
            return res
                .status(400)
                .json({ error: "Password must be at least 6 characters long" });
        }

        const result = await signup(username, email, password);

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
        if (error.message === "Username already exists") {
            return res.status(409).json({ error: error.message });
        }
        console.error("Signup error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const loginController = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res
                .status(400)
                .json({ error: "Username and password are required" });
        }

        const result = await login(username, password);

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
        if (error.message === "Invalid credentials") {
            return res.status(401).json({ error: error.message });
        }
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const logoutController = async (req, res) => {
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

module.exports = {
    signupController,
    loginController,
    logoutController,
};
