import mongoose from "mongoose";
import { logError } from "../utils/logger";

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DATABASE_URI as string, {
			dbName: process.env.DATABASE_DBNAME
		});
	} catch (error: unknown) {
		logError(error as string);
	}
};

export default connectDB;
