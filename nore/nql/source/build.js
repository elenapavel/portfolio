import { isString, isArray } from "@nore/std/assert";
import queryTypes from "./queryTypes";
import queryFields from "./queryFields";

export default function build(query = {}) {
	if (!queryTypes.has(query.type)) {
		throw Error(`Invalid query type: ${query.type}`);
	}

	const segments = [];
	const fields = {};
	const values = [];

	for (const field of queryTypes.get(query.type)) {
		if (queryFields.has(field)) {
			// ignore unset fields
			if (query[field] === undefined) continue;

			const handler = queryFields.get(field);
			const result = handler(query[field], query, build, fields);

			// ignore field if it returns null
			if (result === null) continue;

			if (isArray(result)) {
				values.push.apply(values, result[1]);

				fields[field] = result[0];
			} else {
				fields[field] = result;
			}
		}

		segments.push(field);
	}

	const sql = segments.map(segment => fields[segment] || segment).join(" ");

	return [sql, values];
}
