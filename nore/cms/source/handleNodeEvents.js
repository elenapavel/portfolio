import log from "./log.js";
import state from "./state.js";

export default () => {
	async function exit(code = 0) {
		// teardown functions
		for (const handler of state.events.terminate) {
			try {
				await Promise.resolve(handler());
			} catch (error) {
				log.fatal(error, "Nore teardown error");
			}
		}

		setImmediate(() => process.exit(code));
	}

	// handle uncaught exceptions or promise errors
	process.on("uncaughtException", error => {
		log.fatal(error, "uncaughtException");
		exit(1);
	});

	process.on("unhandledRejection", (error, promise) => {
		log.fatal(error, "unhandledRejection");
		exit(1);
	});

	process.on("multipleResolves", (type, promise, reason) => {
		if (reason instanceof Error) {
			log.fatal(error, "multipleResolves");
			exit(1);
		}
	});

	process.on("SIGINT", sig => {
		log.debug("SIGINT - terminate the process, gracefully");
		exit();
	});

	process.on("SIGTERM", sig => {
		log.debug("SIGTERM - terminate the process, gracefully or not");
		exit();
	});
};
