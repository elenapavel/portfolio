import { ArgumentError } from "../error";
import { isArray, isObject } from "../assert";

export default function omit(source, keys) {
	if (!isObject(source)) {
		throw new ArgumentError("source", "object", source);
	}

	if (!isArray(keys)) {
		throw new ArgumentError("keys", "array", keys);
	}

	const result = {};

	for (const key in source) {
		if (!keys.includes(key)) {
			result[key] = source[key];
		}
	}

	return result;
}
