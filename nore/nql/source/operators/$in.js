import { isArray, isObject } from "@nore/std/assert";
import { isNullOrBoolean, toUpperCase } from "../utils";

export default function $in({ condition, column, joiner, query, build }) {
	// array
	if (isArray(condition)) {
		// ignore empty arrays
		if (!condition.length) return null;

		const values = condition.filter(Boolean);
		const special = condition.filter(isNullOrBoolean);
		const conditions = [];

		if (values.length) {
			conditions.push(`${column} IN (${values.map(i => "?").join(", ")})`);
		}

		if (special.length) {
			conditions.push(...special.map(v => `${column} IS ${toUpperCase(v)}`));
		}

		return [conditions.join(" OR "), values];
	}

	// sub-query
	if (isObject(condition)) {
		const [sql, values] = build(condition);

		return [`${column} IN (${sql})`, values];
	}

	// ignore unsuported values
	return null;
}
