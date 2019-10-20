import { keys } from "@nore/std/object";

const typeMap = {
	string: "TEXT",
	number: "INTEGER",
	integer: "INTEGER",
	boolean: "INTEGER",
	blob: "TEXT",
	// these will be converted to JSON format
	array: "TEXT",
	object: "TEXT",
};

const validTypes = keys(typeMap);
const inList = (list, item) => list && list.includes(item);

export default function toSQL(schema) {
	const fields = [];

	for (const name in schema.properties) {
		const field = schema.properties[name];

		if (!inList(validTypes, field.type)) {
			throw Error("schema could not be converted to SQL");
		}

		let fmt = `${name} ${typeMap[field.type].toUpperCase()}`;

		if (inList(schema.primaryKeys, name)) {
			fmt += ` PRIMARY KEY`;
		}

		if (inList(schema.required, name)) {
			fmt += ` NOT NULL`;
		}

		if (inList(schema.unique, name)) {
			fmt += ` UNIQUE`;
		}

		fields.push(fmt);
	}

	return `CREATE TABLE IF NOT EXISTS ${schema.table} (${fields.join(", ")});`;
}
