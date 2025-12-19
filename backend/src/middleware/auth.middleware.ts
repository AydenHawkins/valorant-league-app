import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

interface JwtPayload {
    userId: number;
    username: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: number;
                username: string;
            };
        }
    }
}

export const authenticateToken = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({ error: "Access token required" });
        return;
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(403).json({ error: "Invalid or expired token" });
            return;
        }

        const payload = decoded as JwtPayload;
        req.user = {
            userId: payload.userId,
            username: payload.username,
        };

        next();
    });
};
