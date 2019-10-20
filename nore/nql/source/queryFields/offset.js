import { isString, isNumber } from "@nore/std/assert";

export default (data, query, build) => {
	const offset = isString(data) ? parseInt(data, 10) : data;

	if (!isNumber(offset)) {
		throw Error(`Invalid field type, query.offset requires a number.`);
	}

	return [`OFFSET ?`, [offset]];
};
