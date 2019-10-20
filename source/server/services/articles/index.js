import { log, plugin, define } from "@nore/cms";
import schema from "./schema.js";

define("github-portfolio/articles", async () => {
	const db = await plugin("nore/sqlite");
	const table = db.table("articles");

	table.hook("records:before", records => {
		for (const record of records) {
			record.updatedAt = Date.now();
		}
	});

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
