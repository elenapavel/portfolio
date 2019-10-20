import { isString, isArray } from "@nore/std/assert";
import { keys } from "@nore/std/object";
import { getTable } from "../utils";

function fmtColumns(data, table) {
	const columns = [];

	for (const entry of data) {
		if (isString(entry)) {
			columns.push(`"${table}"."${entry}"`);
		} else {
			columns.push(`"${table}"."${entry.name}" AS "${entry.as}"`);
		}
	}

	return columns.join(", ");
}

export default (data, query, build) => {
	const table = getTable(query);

	// string
	if (isString(data)) {
		return data === "*" ? `"${table}".*` : `"${table}"."${data}"`;
	}

	// array
	if (isArray(data)) {
		return fmtColumns(data, table);
	}

	// object
	const aliases = keys(data).map(column => ({
		name: column,
		as: data[column],
	}));

	return fmtColumns(aliases, table);
};
