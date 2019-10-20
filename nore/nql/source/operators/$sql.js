import { isArray } from "@nore/std/assert";

export default function $sql({ condition, column, joiner, query }) {
	if (isArray(condition)) {
		return [condition[0], condition.slice(1)];
	}

	return condition;
}
