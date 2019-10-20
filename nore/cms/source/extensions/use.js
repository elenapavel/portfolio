import state from "../state.js";

export default async function use(key) {
	for (const [handle, extension] of state.extensions) {
		if (extension.match(key)) {
			return await Promise.resolve(extension.get(extension.store, key));
		}
	}

	throw Error(`No extension could match ${key}, nothing was defined`);
}
