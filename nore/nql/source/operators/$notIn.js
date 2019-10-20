import { isArray, isObject } from "@nore/std/assert";
import { isNullOrBoolean, toUpperCase } from "../utils";

export default function $notIn({ condition, column, joiner, query, build }) {
	// array
	if (isArray(condition)) {
		// ignore empty arrays
		if (!condition.length) return null;

		const values = condition.filter(Boolean);
		const nullOrBool = condition.filter(isNullOrBoolean);
		const conditions = [];

		if (values.length) {
			conditions.push(`${column} NOT IN (${values.map(i => "?").join(", ")})`);
		}

		if (nullOrBool.length) {
			const fmtCondition = value => `${column} IS NOT ${toUpperCase(value)}`;

			conditions.push.apply(conditions, nullOrBool.map(fmtCondition));
		}

		return [conditions.join(" OR "), values];
	}

	// sub-query
	if (isObject(condition)) {
		const [sql, values] = build(condition);

		return [`${column} NOT IN (${sql})`, values];
	}

	// ignore unsuported values
	return null;
}
