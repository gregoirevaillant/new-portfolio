import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

import { CustomRequest } from "../types/CustomRequest";

interface DecodedToken {
	email: string;
	userID: string;
	roles: number[];
}

const verifyJWT = (req: CustomRequest, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization || (req.headers.Authorization as string);

	if (!authHeader?.startsWith("Bearer ")) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	const token = authHeader.split(" ")[1];

	if (!token) return res.status(401).json({ error: "Access denied" });

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, decoded) => {
		if (err) return res.status(403).json({ message: "Forbidden" });
		const decodedToken = decoded as DecodedToken;
		req.userID = decodedToken.userID;
		req.roles = decodedToken.roles;
		next();
	});
};

export default verifyJWT;
