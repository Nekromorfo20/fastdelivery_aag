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
        const error = new Error('Token de sesión no válido');
        return res.status(401).json({ error: error.message });
    }

    const [,token] = bearer.split(' ');

    try {
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);

        if (typeof tokenDecoded === 'object' && tokenDecoded.id) {
            const user = await User.findOne({
                where: { id: tokenDecoded.id },
                attributes: ["id", "name", "email"]
            });

            if (user) {
                req.user = user;
                next();
            } else {
                res.status(401).json({ error: 'Token de sesión no válido' });
            }
        }

    } catch (error) {
        res.status(500).json({ error: 'Error validando sesión' });
    }
}