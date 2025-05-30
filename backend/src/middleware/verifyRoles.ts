import { Response, NextFunction } from "express";

import { CustomRequest } from "../types/CustomRequest";

const verifyRoles = (...allowedRoles: number[]) => {
	return (req: CustomRequest, res: Response, next: NextFunction) => {
		if (!req?.roles) return res.status(401).json({ message: "Unauthorized" });

		const rolesArray = [...allowedRoles];

		const result = req.roles.map((role) => rolesArray.includes(role)).find((value) => value === true);

		if (!result) return res.status(401).json({ message: "Unauthorized" });

		next();
	};
};

export default verifyRoles;
