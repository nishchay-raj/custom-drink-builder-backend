import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { Role } from "../generated/prisma/enums";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.auth_token;

    if(!token){
        return res.status(401).json({error: "Not authenticated"});
    }

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as {
            id: string;
            email: string;
            role: Role;
        };

        req.user = decoded;

        next();
        
    } catch (err) {
        return res.status(401).json({error: "Invalid or expired token"});
    }
};

export const requireRole = (...roles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if(!req.user){
            return res.status(401).json({error: "Not authenticated"});
        }

        if(!roles.includes(req.user.role)){
            return res.status(403).json({error: "Forbidden" });
        }

        next();
    }
}