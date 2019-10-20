import { isArray, isObject, isBoolean } from "@nore/std/assert";
import { setPrefix } from "../utils";

export default function $isNull({ condition, column, joiner, query }) {
	if (isArray(condition)) {
		// ignore empty arrays
		if (!condition.length) return null;

		return condition
			.map(column => `${setPrefix(column, query)} IS NULL`)
			.join(joiner);
	}

	if (isBoolean(condition)) {
		return `${column} ${condition === false ? "IS NOT" : "IS"} NULL`;
	}

	// ignore unsuported values
	return null;
}
