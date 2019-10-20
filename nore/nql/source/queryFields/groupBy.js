import { isString, isArray } from "@nore/std/assert";
import { getTable } from "../utils";

export default (data, query, build) => {
	const table = getTable(query);

	// array
	if (isArray(data)) {
		if (!data.length) return null;

		const columns = data.map(column => `"${table}"."${column}"`);

		return `GROUP BY ${columns.join(", ")}`;
	}

	return `GROUP BY "${table}"."${data}"`;
};
