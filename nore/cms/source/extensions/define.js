import state from "../state.js";

export default function define(key, handler) {
	for (const [handle, extension] of state.extensions) {
		if (extension.match(key)) {
			return extension.set(extension.store, key, handler);
		}
	}

	throw Error(`No extension could match ${key}, nothing was defined`);
}
