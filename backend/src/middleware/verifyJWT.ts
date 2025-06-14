import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

import { CustomRequest } from "../types/CustomRequest";

interface DecodedToken {
    email: string;
    userID: string;
}

const verifyJWT = (req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader =
        req.headers.authorization || (req.headers.Authorization as string);

    if (!authHeader?.startsWith("Bearer ")) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({ error: "Access denied" });
        return;
    }

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string,
        (err, decoded) => {
            if (err) {
                res.status(403).json({ message: "Forbidden" });
                return;
            }

            const decodedToken = decoded as DecodedToken;
            req.userID = decodedToken.userID;
            next();
        }
    );
};

export default verifyJWT;
