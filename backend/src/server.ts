import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes";

dotenv.config();

const app = express();

// CORS configuration to allow credentials (cookies)
const corsOptions: cors.CorsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

app.get("/", (_req, res) => {
  res.json({ message: "Valorant Tournament API is running!" });
});

const PORT: string | number = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
