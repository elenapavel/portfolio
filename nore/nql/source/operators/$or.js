import { flatten, isArray } from "@nore/std/array";

export default function $or(args) {
	const joiner = " OR ";

	if (isArray(args.condition)) {
		const result = args.condition
			.map(condition => args.parse({ ...args, condition, joiner }))
			// normalize results: [sql, values]
			.map(result => (isArray(result) ? result : [result, []]));

		return [
			result.map(entry => entry[0]).join(joiner),
			flatten(result.map(entry => entry[1])),
		];
	}

	return args.parse({ ...args, joiner });
}
