import { isObject, isArray } from "@nore/std/assert";
import { setPrefix } from "../utils";

export default function $between({ condition, column, joiner, query, parse }) {
	if (isArray(condition)) {
		// ignore empty arrays
		if (!condition.length) return null;

		return [`${column} BETWEEN ? AND ?`, condition];
	}

	if (isObject(condition)) {
		const conditions = [];
		const values = [];

		for (const column in condition) {
			conditions.push(`${setPrefix(column, query)} BETWEEN ? AND ?`);

			values.push.apply(values, condition[column]);
		}

		return [conditions.join(joiner), values];
	}

	// ignore unsuported values
	return null;
}
