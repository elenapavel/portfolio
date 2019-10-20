import { isObject, isArray } from "@nore/std/assert";
import { keys } from "@nore/std/object";
import { isNullOrBoolean, setPrefix } from "../utils";
import operators from "../operators";

function parse(args) {
	// $is is used as default operator
	const $is = operators.get("$is");

	const conditions = [];
	const values = [];

	for (const field in args.condition) {
		const operator = operators.get(field) || $is;
		const options = { ...args, condition: args.condition[field] };

		// if no operator, we treat it like a column name
		if (!operators.has(field)) {
			// quote and prefix column with target table
			options.column = setPrefix(field, args.query);
		}

		const result = operator(options);

		// ignore operator on null
		if (result === null) continue;

		if (isArray(result)) {
			conditions.push(result[0]);
			values.push.apply(values, result[1] || []);
		} else {
			conditions.push(result);
		}
	}

	return [conditions.join(args.joiner), values];
}

export default (data, query, build) => {
	if (!isObject(data)) {
		throw Error(`Invalid field type, query.where requires an object.`);
	}

	const [sql, values] = parse({
		// build and parse functions will be passed to operators
		build,
		parse,
		// original query passed to build
		query,
		// the object passed to where
		condition: data,
		// the property name of the parent object, if any
		column: null,
		// the logical operator used to join conditions
		joiner: " AND ",
	});

	return !sql ? null : [`WHERE ${sql}`, values];
};
