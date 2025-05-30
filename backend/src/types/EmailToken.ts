import { ObjectId } from "mongodb";

export type EmailToken = {
	userID: ObjectId;
	token: string;
	createdAt: Date;
	updatedAt: Date;
};
