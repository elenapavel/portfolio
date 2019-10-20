import { get, keys, pick } from "@nore/std/object";

export default function getSchemaByType(colors, path, type) {
	const schema = get(colors, path.split("."));
	const isScale = type == "scale";
	const byType = isScale ? x => x[0] === "x" : x => x[0] !== "x";
	const labels = keys(schema).filter(byType);

	return pick(schema, isScale ? labels : labels.slice(1, -1));
}
