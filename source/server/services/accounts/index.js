import { unique } from "@nore/std/array";
import { log, define, plugin } from "@nore/cms";
import crypto from "./crypto.js";
import schema from "./schema.js";
import hooks from "./hooks.js";

define("github-portfolio/accounts", async () => {
	const db = await plugin("nore/sqlite");
	const table = db.table("accounts");

	table.hook("records:before", hooks.before);
	table.hook("records:after", hooks.after);

	return {
		schema,

		async create(data) {
			data.createdAt = Date.now();

			schema.validateOrThrow(data);
			await table.insert(data);

			return data;
		},

		async getById(id) {
			return table.findOne({ id });
		},

		async getByLogin(login) {
			return table.findOne({ $or: [{ login }, { email: login }] });
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

		async save(record) {
			// don't rehash password
			delete record.password;

			return table.update({ id: record.id }, record);
		},

		async delete(query) {
			return table.delete(query);
		},

		async deleteById(id) {
			return table.delete({ id });
		},

		async count(query = {}) {
			const options = {
				type: "select",
				columns: "*",
				count: { column: "id", as: "total" },
				table: table.name,
				where: query,
			};

			const [sql, values] = db.nql.build(options);
			const record = await table.db.get(sql, values);

			return record ? record.total : 0;
		},

		async addToGroup(id, group) {
			const groups = Array.isArray(group) ? group : [group];
			const account = await this.getById(id);

			account.groups = unique(account.groups.concat(group));

			return this.update({ id }, { groups: account.groups });
		},

		async verifyPassword(password, token) {
			return crypto.verify(password, token);
		},

		async hashPassword(password) {
			return crypto.hash(password);
		},
	};
});
