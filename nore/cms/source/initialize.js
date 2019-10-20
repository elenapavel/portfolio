import runOnNextEventCycle from "./utils/runOnNextEventCycle.js";
import handleNodeEvents from "./handleNodeEvents.js";
import loadPlugins from "./plugins/load.js";
import state from "./state.js";
import log from "./log.js";

// handle node process events
handleNodeEvents();

// allow loaded code to execute before initializing the CMS
runOnNextEventCycle(async () => {
	// load plugins
	await loadPlugins();

	// load services
	for (const [namespace, services] of state.extensions.get("services").store) {
		for (const [name, handler] of services) {
			services.set(name, await handler());
		}
	}

	state.isReady = true;

	// run on("ready") handlers
	for (const handler of state.events.ready) {
		await Promise.resolve(handler());
	}

	// run on("final") handlers on next loop
	// give time to on("ready") handlers to execute
	runOnNextEventCycle(async () => {
		for (const handler of state.events.final) {
			await Promise.resolve(handler());
		}

		// output current errors
		for (const error of state.errors.values()) {
			log.error(error);
		}

		// TODO: update db with plugin states
	});
});
