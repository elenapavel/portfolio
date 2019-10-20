import { isObject } from "@nore/std/assert";

export default (data, query, build) => {
	if (!isObject(data)) {
		throw Error(`Invalid field type, query.set requires an object.`);
	}

	const updates = [];
	const values = [];

	for (const key in data) {
		const isNull = data[key] === null;
		const sql = `"${key}" = ${isNull ? "NULL" : "?"}`;

		updates.push(sql);

		if (!isNull) values.push(data[key]);
	}

	if (!updates.length) {
		throw Error(`Invalid field data, query.set received an empty object.`);
	}

	return [`SET ${updates.join(", ")}`, values];
};
