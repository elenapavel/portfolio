import { isArray, isObject } from "@nore/std/assert";
import { keys } from "@nore/std/object";

function getColumns(data, values) {
	const toExcluded = column => `${column}=excluded.${column}`;
	const columns = !isArray(data)
		? keys(values).filter(key => key !== data)
		: data[1];

	return columns.map(toExcluded).join(", ");
}

export default (data, query, build) => {
	const conflict = isArray(data) ? data[0] : data;
	const columns = getColumns(data, query.values);

	return `ON CONFLICT("${conflict}") DO UPDATE SET ${columns}`;
};
