import { ArgumentError } from "../error";
import { isArray } from "../assert";

export default function unique(list) {
	if (!isArray(list)) {
		throw new ArgumentError("list", "array", list);
	}

	const result = [];

	for (let item of list) {
		if (!result.includes(item)) {
			result.push(item);
		}
	}

	return result;
}
