import { isObject, isArray } from "@nore/std/assert";
import fmtColumns from "./columns.js";

export default (data, query, build) => {
	// array
	if (isArray(data)) {
		if (!data.length) return null;

		return `ORDER BY ${fmtColumns(data, query)}`;
	}

	// object
	if (isObject(data)) {
		const asc = [];
		const desc = [];
		const orderBy = [];

		for (const field in data) {
			const value = data[field];

			if (field === "$asc") {
				asc.push.apply(asc, value);
			} else if (field === "$desc") {
				desc.push.apply(desc, value);
			} else {
				(value === "desc" ? desc : asc).push(field);
			}
		}

		if (asc.length) {
			orderBy.push(`${fmtColumns(asc, query)} ASC`);
		}

		if (desc.length) {
			orderBy.push(`${fmtColumns(desc, query)} DESC`);
		}

		if (!orderBy.length) return null;

		return `ORDER BY ${orderBy.join(", ")}`;
	}

	// string
	return `ORDER BY ${fmtColumns(data, query)}`;
};
