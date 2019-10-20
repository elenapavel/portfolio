import { isArray } from "@nore/std/assert";

const keywords = ["CURRENT_TIME", "CURRENT_DATE", "CURRENT_TIMESTAMP"];

function toForeignKeysSQL({ name, foreignKey: [table, column] }) {
	return `FOREIGN KEY ("${name}") REFERENCES "${table}" ("${column}")`;
}

export function toForeignKeys(definitions) {
	const foreignKeys = definitions
		.filter(e => e.foreignKey)
		.map(toForeignKeysSQL)
		.join(", ");

	return foreignKeys ? `, ${foreignKeys}` : "";
}

export function toDefinition(data) {
	let def = `"${data.name}"`;

	if (data.isAutoIncrement) {
		def += " INTEGER AUTOINCREMENT";
	} else {
		def += " " + (data.type ? data.type.toUpperCase() : "TEXT");
	}

	if (data.isPrimaryKey) {
		def += " PRIMARY KEY NOT NULL";
	} else if (data.isNullable === false) {
		def += " NOT NULL";
	}

	if (data.isUnique) {
		def += " UNIQUE";
	}

	if (data.default) {
		const isKeyword = keywords.includes(data.default);
		const value = isKeyword ? data.default : `'${data.default}'`;

		def += ` DEFAULT ${value}`;
	}

	return def;
}

export function toSQL(data) {
	const columns = data.map(toDefinition).join(", ");
	const foreignKeys = toForeignKeys(data);

	return columns + foreignKeys;
}

export default (data, query, build) => {
	if (isArray(data)) {
		// ignore empty arrays
		if (!data.length) return null;

		return `(${toSQL(data)})`;
	}

	// ignore unsuported values
	return null;
};
