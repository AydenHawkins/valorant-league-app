const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const routes = require("./routes");

dotenv.config();

const app = express();

// CORS configuration to allow credentials (cookies)
app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173", // Vite default port
        credentials: true, // Allow cookies to be sent
    })
);

app.use(express.json());
app.use(cookieParser()); // Parse cookies from requests

app.use("/api", routes);

app.get("/", (req, res) => {
    res.json({ message: "Valorant Tournament API is running!" });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
