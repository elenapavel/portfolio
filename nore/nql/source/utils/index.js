import { isString, isArray } from "@nore/std/assert";

export function isNullOrBoolean(value) {
	return value === true || value === false || value === null;
}

export function toUpperCase(value) {
	return String(value).toUpperCase();
}

export function getTable(query) {
	const { table } = query;

	return isString(table) ? table : isArray(table) ? table[1] : table.as;
}

export function setPrefix(column, query) {
	return `"${getTable(query)}"."${column}"`;
}
