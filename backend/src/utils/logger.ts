import chalk from "chalk";
import dayjs from "dayjs";

const getTimestamp = () => dayjs().format("DD/MM - HH:mm:ss");

const colors = {
	INFO: chalk.green,
	WARN: chalk.yellow,
	ERROR: chalk.red
};

function formatter(type: string, message: string) {
	switch (type) {
		case "error":
			return `\x1b[31m${message}\x1b[0m`;
		case "warn":
			return `\x1b[33m${message}\x1b[0m`;
		case "log":
		default:
			return message;
	}
}

const logger = (level: "INFO" | "WARN" | "ERROR", message: string) => {
	const date = getTimestamp();
	const paddedLevel = level.padEnd(6, " ");
	const colorize = colors[level] || chalk.white;

	console.log(`[${date}] ${colorize(`[${paddedLevel}]:`)} ${message}`);
};

export const logInfo = (message: string) => logger("INFO", message);
export const logWarn = (message: string) => logger("WARN", message);
export const logError = (message: string) => logger("ERROR", message);

export default logger;
