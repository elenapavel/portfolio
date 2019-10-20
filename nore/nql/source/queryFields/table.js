import { isString, isArray } from "@nore/std/assert";

export default (data, query, build) => {
	if (isString(data)) {
		return `"${data}"`;
	}

	if (isArray(data)) {
		return `"${data[0]}" AS "${data[1]}"`;
	}

	return `"${data.name}" AS "${data.as}"`;
};
