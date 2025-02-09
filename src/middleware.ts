import { NextFunction, Request, Response } from "express";
import dotenv from 'dotenv';
dotenv.config();
import jwt from "jsonwebtoken";

const KEY = process.env.JWT_SECRET
if (!KEY) {
    throw new Error('JWT_SECRET must be defined in environment variables')
}

export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    const decoded = jwt.verify(header as string, KEY);

    if (decoded) {
        // @ts-ignore
        req.userId = decoded.id;
        next();
    } else {
        res.status(401).json({ message: "Unauthorized User" });
    }
};
