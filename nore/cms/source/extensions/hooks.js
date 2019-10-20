import state from "../state.js";
import log from "../log.js";

// ex: "nore/http::register"
const FORMAT = /^[\w-_\.]+\/[\w-_\.]+::[\w-_\.]+$/;

export default {
	handle: "hook",
	match: key => FORMAT.test(key),

	set(store, key, handler) {
		const [handle, name] = key.split("::");

		// add plugin handle to hooks map
		if (!store.has(handle)) {
			store.set(handle, new Map());
		}

		const hooks = store.get(handle);

		// check if hook was already declared
		if (hooks.has(name)) {
			state.errors.add(new Error(`Hook "${key}" was already defined`));
		} else {
			hooks.set(name, handler);
			log.debug(`Hook defined ${key}`);
		}
	},

	get(store, key) {
		const [handle, name] = key.split("::");

		if (!state.plugins.has(handle)) {
			throw Error(
				`Invalid hook "${key}", plugin handle "${handle}" is not valid`
			);
		}

		if (!store.has(handle)) {
			throw Error(
				`Invalid hook "${key}", no hooks were defined on "${handle}"`
			);
		}

		const hooks = store.get(handle);
		const handler = hooks.get(name);

		if (!handler) {
			throw Error(`Invalid hook name "${name}" in "${key}"`);
		}

		return handler;
	},
};
