import { isString, isNumber } from "@nore/std/assert";

export default (data, query, build) => {
	const limit = isString(data) ? parseInt(data, 10) : data;

	if (!isNumber(limit)) {
		throw Error(`Invalid field type, query.limit requires a number.`);
	}

	return [`LIMIT ?`, [limit]];
};
