import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../types";
import User from "../models/postgres/User.model";

declare global {
    namespace Express {
        interface Request {
            user? : IUser
        }
    }
}

export const authenticate = async (req : Request, res : Response, next : NextFunction) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        const error = new Error('No autorizado');
        return res.status(401).json({ error: error.message });
    }

    const [,token] = bearer.split(' ');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (typeof decoded === 'object' && decoded.id) {
            const user = await User.findByPk(decoded.id, {
                attributes: { exclude: ["password", "createdAt", "updatedAt"] }
            });
            if (user) {
                req.user = user;
                next();
            } else {
                res.status(500).json({ error: 'Token no válido' });
            }
        }

    } catch (error) {
        res.status(500).json({ error: 'Token no válido' });
    }
}