import { log, define, plugin } from "@nore/cms";
import schema from "./schema.js";
import hooks from "./hooks.js";

define("github-portfolio/pages", async () => {
	const db = await plugin("nore/sqlite");
	const table = db.table("pages");

	table.hook("records:before", hooks.before);
	table.hook("records:after", hooks.after);

	return {
		async create(data) {
			data.createdAt = Date.now();

			schema.validateOrThrow(data);
			await table.insert(data);

			return data;
		},

		async getById(id) {
			return table.findOne({ id });
		},

		async findOne(query) {
			return table.findOne(query);
		},

		async find(query, filters = {}) {
			return table.find(query, filters);
		},

		async findAndCount(query, filters = {}) {
			const [total, records] = await Promise.all([
				table.count(),
				table.find(query, filters),
			]);

			return { total, records };
		},

		async update(query, data) {
			return table.update(query, data);
		},

		async deleteById(id) {
			return table.delete({ id });
		},
	};
});
