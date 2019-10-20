import { isObject } from "@nore/std/assert";
import { setPrefix } from "../utils";

export default function $match({ condition, column, joiner, query }) {
	if (isObject(condition)) {
		const conditions = [];
		const values = [];

		for (const column in condition) {
			conditions.push(`${setPrefix(column, query)} GLOB ?`);

			values.push(condition[column]);
		}

		return [conditions.join(joiner), values];
	}

	return [`${column} GLOB ?`, [condition]];
}
