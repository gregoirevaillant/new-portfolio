import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import http from "http";
import path from "path";

import corsOptions from "./config/corsOptions";
import logResponse from "./middleware/logResponse";
import { logError, logInfo } from "./utils/logger";
import mongoose from "mongoose";
import connectDB from "./config/dbConnect";

dotenv.config({ path: path.join(__dirname, "..", ".env") });
logInfo(`NODE_ENV: ${process.env.NODE_ENV}`);

connectDB();

const PORT = process.env.PORT || 3003;
const app: Express = express();
const server = http.createServer(app);

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logResponse);

app.get('/ok', (req, res, next) => {
    res.status(200).json({"test": "test"})
});

mongoose.connection.once("open", () => {
	logInfo("Connected to mongoDB");
	server.listen(PORT, () => {
		logInfo(`Server running at ${process.env.BASE_URL}:${PORT}`);
	});
});

mongoose.connection.on("error", (error: Error) => {
	console.log('here erorr')

	logError(error.message);
});

export { app, server };
