import { ArgumentError } from "../error";
import { isArray, isObject } from "../assert";

export default function pick(source, keys) {
	if (!isObject(source)) {
		throw new ArgumentError("source", "object", source);
	}

	if (!isArray(keys)) {
		throw new ArgumentError("keys", "array", keys);
	}

	const result = {};

	for (const key of keys) {
		if (key in source) {
			result[key] = source[key];
		}
	}

	return result;
}
