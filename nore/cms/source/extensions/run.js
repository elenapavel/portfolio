import state from "../state.js";

export default async function run(key, data) {
	for (const [handle, extension] of state.extensions) {
		if (extension.match(key)) {
			const handler = extension.get(extension.store, key);

			if (!handler) {
				throw Error(`Extension ${handle} returned no valid handler for ${key}`);
			}

			return await Promise.resolve(handler(data));
		}
	}

	throw Error(`No extension could match ${key}, nothing was defined`);
}
