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

        res.status(201).json({
            message: "User created successfully",
            user: result.user,
            token: result.token,
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

        res.status(200).json({
            message: "Login successful",
            user: result.user,
            token: result.token,
        });
    } catch (error) {
        if (error.message === "Invalid credentials") {
            return res.status(401).json({ error: error.message });
        }
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    signupController,
    loginController,
};
