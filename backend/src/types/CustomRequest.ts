import { Request } from "express";

export interface CustomRequest extends Request {
	userID?: string;
	roles?: number[];
}
