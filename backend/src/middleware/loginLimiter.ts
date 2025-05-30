import { NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
	windowMs: 60 * 1000,
	max: process.env.NODE_ENV === "local" ? 9999 : 5,
	message: {
		message: "Too many login attempts from this IP, please try again after a 60 second pause"
	},
	handler: (req: Request, res: Response, next: NextFunction, options) => {
		res.status(options.statusCode).send(options.message);
	},
	standardHeaders: true,
	legacyHeaders: false
});

export default loginLimiter;
