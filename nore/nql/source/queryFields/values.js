import { keys } from "@nore/std/object";
import { isArray } from "@nore/std/assert";

function format(entry) {
	const params = [];
	const values = [];

	for (const key in entry) {
		const value = entry[key];

		if (value === null) {
			params.push("NULL");
		} else {
			params.push("?");
			values.push(value);
		}
	}

	return [`(${params.join(", ")})`, values];
}

export default (data, query, build) => {
	data = isArray(data) ? data : [data];

	const params = [];
	const values = [];

	for (const entry of data) {
		const result = format(entry);

		params.push(result[0]);
		values.push.apply(values, result[1]);
	}

	const columns = keys(data[0])
		.map(name => `"${name}"`)
		.join(", ");

	return [`(${columns}) VALUES ${params.join(", ")}`, values];
};
