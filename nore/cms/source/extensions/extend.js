import state from "../state.js";
import use from "./use.js";
import run from "./run.js";

export default function extend(key, { handle, match, set, get }) {
	if (state.extensions.has(key) || define[key]) {
		throw Error(`Extension ${key} already defined`);
	}

	// the store where all extension handlers will reside
	const store = new Map();

	if (handle) {
		define[handle] = (key, handler) => set(store, key, handler);
		use[handle] = (key, handler) => get(store, key, handler);
		run[handle] = (key, handler) => get(store, key, handler);
	}

	state.extensions.set(key, { match, set, get, store });
}
