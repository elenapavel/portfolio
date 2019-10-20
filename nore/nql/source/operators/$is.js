import { isArray, isObject } from "@nore/std/assert";
import { isNullOrBoolean, toUpperCase } from "../utils";

export default function $is(options) {
	const { condition, parse, query, column } = options;

	// sub-query
	if (isObject(condition)) {
		return parse(options);
	}

	// null or boolean
	if (isNullOrBoolean(condition)) {
		return `${column} IS ${toUpperCase(condition)}`;
	}

	// string
	return [`${column} == ?`, [condition]];
}
