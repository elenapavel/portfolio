import { isArray, isObject } from "@nore/std/assert";
import { isNullOrBoolean, toUpperCase } from "../utils";
import $is from "./$is.js";

function invert(value) {
	return value.replace(/ == /g, " != ").replace(/ IS /g, " IS NOT ");
}

function invertResult(result) {
	return isArray(result) ? [invert(result[0]), result[1]] : invert(result);
}

export default function $not(options) {
	// sub-query
	if (isObject(options.condition)) {
		const result = $is(options);

		return result ? invertResult(result) : "";
	}

	const { condition, query, column } = options;

	// null or boolean
	if (isNullOrBoolean(condition)) {
		return `${column} IS NOT ${toUpperCase(condition)}`;
	}

	// string
	return [`${column} != ?`, [condition]];
}
