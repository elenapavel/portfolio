import { log, plugin, run } from "@nore/cms";
import sessions from "./sessions.js";
import getStore from "./store.js";

export default async options => {
	const db = await plugin("nore/sqlite");
	const table = db.table("sessions");
	const store = getStore({ table });

	run("nore/http::register", {
		plugin: sessions({ store }),
		options: options,
	});

	// delete expired sessions
	if (options.autoclean) {
		setInterval(async () => {
			await store.cleanup();
		}, options.autocleanInterval);
	}
};
