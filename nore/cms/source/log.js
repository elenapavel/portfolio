import pino from "pino";

const log = pino({
	name: "nore",
	level: IS_DEBUG ? "debug" : "info",
	prettyPrint: IS_DEBUG && {
		translateTime: "HH:MM:ss",
		ignore: "pid,hostname",
	},
});

export default log;
