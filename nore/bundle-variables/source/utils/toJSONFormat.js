import { set, get } from "@nore/std/object";

export default variables => {
	const data = {};

	for (const key in variables) {
		const path = key.split(".");

		if (!get(data, path)) {
			set(data, path, variables[key]);
		}
	}

	return JSON.stringify(data);
};
