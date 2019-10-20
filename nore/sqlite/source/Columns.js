import { flatten } from "@nore/std/array";
import { definitions } from "@nore/nql";
import metaToDefs from "./utils/metaToDefs.js";
import alterColumn from "./utils/alterColumn.js";

export default class Columns {
	constructor(table) {
		this.table = table;
		this.db = table.db;
	}

	async set(data) {
		if (await this.has(data.name)) {
			return await alterColumn(this.table, "update", data);
		} else {
			return this.db.run(
				`ALTER TABLE ${this.table.name} ADD COLUMN ${definitions.toSQL([data])}`
			);
		}
	}

	async getAll(options = {}) {
		if (options.isUnique) {
			const indexes = await this.table.indexes.getAll();
			const uniques = indexes.filter(e => e.type === "unique");

			return uniques.map(e => e.column);
		}

		return this.db.pragma(`table_info(${this.table.name})`);
	}

	async get(name) {
		const columns = await this.getAll();
		const uniques = await this.getAll({ isUnique: true });
		const meta = columns.filter(c => c.name === name);
		const column = metaToDefs(meta[0]);

		if (uniques.includes(column.name)) {
			column.isUnique = true;
		}

		return column;
	}

	async has(name) {
		const columns = await this.getAll();
		const filtered = columns.filter(e => e.name === name);

		return filtered.length > 0;
	}

	async rename(from, to) {
		return this.db.run(
			`ALTER TABLE ${this.table.name} RENAME COLUMN ${from} TO ${to}`
		);
	}

	async delete(name) {
		return await alterColumn(this.table, "delete", name);
	}
}
