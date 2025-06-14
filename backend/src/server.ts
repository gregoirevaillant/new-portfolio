import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import http from "http";
import mongoose from "mongoose";
import path from "path";

import corsOptions from "./config/corsOptions";
import connectDB from "./config/dbConnect";
import logResponse from "./middleware/logResponse";
import auth from "./routes/auth.routes";
import project from "./routes/project.routes";
import { logError, logInfo } from "./utils/logger";

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

app.use("/auth", auth);
app.use("/projects", project);

mongoose.connection.once("open", () => {
    logInfo("Connected to mongoDB");
    server.listen(PORT, () => {
        logInfo(`Server running at ${process.env.BASE_URL}:${PORT}`);
    });
});

mongoose.connection.on("error", (error: Error) => {
    console.log("here erorr");

    logError(error.message);
});

export { app, server };
