import { isString, isObject } from "@nore/std/assert";
import { setPrefix } from "../utils";

export default function $like({ condition, column, joiner, query }) {
	if (isString(condition)) {
		return [`${column} LIKE ?`, [condition]];
	}

	if (isObject(condition)) {
		const conditions = [];
		const values = [];

		for (const column in condition) {
			conditions.push(`${setPrefix(column, query)} LIKE ?`);

			values.push(condition[column]);
		}

		return [conditions.join(joiner), values];
	}

	// ignore unsuported values
	return null;
}
