import chalk from "chalk";
import dayjs from "dayjs";
import { NextFunction, Request, Response } from "express";

const logResponse = (req: Request, res: Response, next: NextFunction) => {
	const start = Date.now();

	res.on("finish", () => {
		const duration = Date.now() - start;
		const status = res.statusCode;

		const color =
			status >= 500
				? chalk.red
				: status >= 400
					? chalk.yellow
					: status >= 300
						? chalk.cyan
						: status >= 200
							? chalk.green
							: chalk.white;

		const date = dayjs().format("DD/MM - HH:mm:ss");

		const paddedMethod = req.method.padEnd(6, " ");

		console.log(
			`[${date}] ${chalk.blue(`[${paddedMethod}]:`)} ${req.originalUrl} ${color(status)} ${duration}ms - [${res.get("content-length") || 0}]`
		);
	});

	next();
};

export default logResponse;
