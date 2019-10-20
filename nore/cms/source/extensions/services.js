import state from "../state.js";
import log from "../log.js";

// ex: "nore/http::register"
const FORMAT = /^[\w-_\.]+\/[\w-_\.]+$/;

export default {
	handle: "service",
	match: key => FORMAT.test(key),

	set(store, key, handler) {
		const [handle, name] = key.split("/");

		// add namespace to services map
		if (!store.has(handle)) {
			store.set(handle, new Map());
		}

		const services = store.get(handle);

		// check if service was already declared
		if (services.has(name)) {
			state.errors.add(new Error(`Service "${key}" was already defined`));
		} else {
			services.set(name, handler);
			log.debug(`Service defined ${key}`);
		}
	},

	get(store, key, handler) {
		const [namespace, name] = key.split("/");
		const services = store.get(namespace);

		if (!services || !services.has(name)) {
			throw Error(`Service "${key}" is not defined`);
		}

		return services.get(name);
	},
};
