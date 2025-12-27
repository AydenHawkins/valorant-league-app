import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

interface JwtPayload {
    userId: number;
    username: string;
    role: string;
}

declare module "express-serve-static-core" {
    interface Request {
        user?: {
            userId: number;
            username: string;
            role: string;
        };
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

    jwt.verify(
        token,
        JWT_SECRET,
        (
            err: jwt.VerifyErrors | null,
            decoded: string | jwt.JwtPayload | undefined
        ) => {
            if (err) {
                res.status(403).json({ error: "Invalid or expired token" });
                return;
            }

            const payload = decoded as JwtPayload;
            req.user = {
                userId: payload.userId,
                username: payload.username,
                role: payload.role,
            };

            next();
        }
    );
};
