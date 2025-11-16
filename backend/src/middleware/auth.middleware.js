const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
    // Read token from HTTP-only cookie instead of Authorization header
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: "Access token required" });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Invalid or expired token" });
        }

        // Add user info to request
        req.user = {
            userId: decoded.userId,
            username: decoded.username,
        };

        next();
    });
};

module.exports = { authenticateToken };
