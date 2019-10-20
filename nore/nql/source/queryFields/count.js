import { isString, isArray } from "@nore/std/assert";
import { getTable } from "../utils";

function fmtColumn(data, table) {
	return data === "*" ? "*" : `"${table}"."${data}"`;
}

function fmtCount(data, table) {
	if (isString(data)) {
		return `COUNT(${fmtColumn(data, table)})`;
	}

	const distinct = data.distinct ? `DISTINCT ` : "";
	const alias = data.as ? ` AS "${data.as}"` : "";
	const column = fmtColumn(data.column, table);

	return `COUNT(${distinct}${column})${alias}`;
}

export default (data, query, build) => {
	const table = getTable(query);
	const prefix = query.columns ? ", " : "";

	// string
	if (isString(data)) {
		return `${prefix}${fmtCount(data, table)}`;
	}

	// array
	if (isArray(data)) {
		// ignore an empty array
		if (!data.length) return null;

		const counts = data.map(item => fmtCount(item, table));

		return `${prefix}${counts.join(", ")}`;
	}

	// object
	return `${prefix}${fmtCount(data, table)}`;
};
