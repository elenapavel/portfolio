import cuid from "cuid";
import { first } from "@nore/std/object";
import nql, { definitions } from "@nore/nql";
import applyHooks from "./utils/applyHooks.js";
import addIDsToRecords from "./utils/addIDsToRecords.js";
import Indexes from "./Indexes.js";
import Columns from "./Columns.js";

export default class Table {
	constructor({ db, name }) {
		this.db = db;
		this.tableName = name;

		// set after table.drop() to flag it as  dropped
		this.isDeleted = false;

		this.indexes = new Indexes(this);
		this.columns = new Columns(this);

		this.hooks = {
			"records:before": [],
			"records:after": [],
		};

		this.settings = {
			limit: undefined,
			columns: "*",
			upsert: "id",
			getID: cuid,
		};
	}

	get name() {
		if (this.isDeleted) {
			throw Error(`Table ${this.tableName} was deleted.`);
		}

		return this.tableName;
	}

	hook(type, handler) {
		if (!this.hooks[type]) {
			throw Error(`Invalid hook "${type}" set for table "${this.tableName}"`);
		}

		this.hooks[type].push(handler);
	}

	async create(data) {
		const [sql, values] = nql({
			type: "create table",
			table: this.tableName,
			definitions: data,
		});

		return this.db.run(sql, values);
	}

	async drop() {
		this.db.run(`DROP TABLE ${this.name}`);

		return (this.isDeleted = true);
	}

	async rename(name) {
		const sql = `ALTER TABLE ${this.name} RENAME TO ${name}`;
		this.tableName = name;

		return this.db.run(sql);
	}

	async count(target = "*") {
		const [sql] = nql({
			type: "select",
			table: this.name,
			count: target,
		});

		return this.db.get(sql).then(result => first(result));
	}

	async insert(data) {
		// apply before hooks
		await applyHooks(this.hooks["records:before"], data);

		// by default add IDs to records
		addIDsToRecords(data, this.settings.getID);

		const [sql, values] = nql({
			type: "insert",
			table: this.name,
			values: data,
		});

		return this.db.run(sql, values);
	}

	async upsert(data, upsert) {
		// apply before hooks
		await applyHooks(this.hooks["records:before"], data);

		const [sql, values] = nql({
			type: "insert",
			table: this.name,
			values: data,
			upsert: upsert || this.settings.upsert,
		});

		return this.db.run(sql, values);
	}

	async find(query, filters = {}) {
		const [sql, values] = nql({
			type: "select",
			table: this.name,
			where: query,
			columns: filters.columns || this.settings.columns,
			orderBy: filters.orderBy,
			groupBy: filters.groupBy,
			offset: filters.offset,
			limit: filters.limit || this.settings.limit,
			distinct: filters.distinct,
		});

		const records = await this.db.getAll(sql, values);

		// apply after hooks
		await applyHooks(this.hooks["records:after"], records);

		return records;
	}

	async findOne(query, filters = {}) {
		const [sql, values] = nql({
			type: "select",
			table: this.name,
			where: query,
			columns: filters.columns || this.settings.columns,
		});

		const record = await this.db.get(sql, values);

		// apply after hooks
		await applyHooks(this.hooks["records:after"], record);

		return record;
	}

	async update(query, data) {
		// apply before hooks
		await applyHooks(this.hooks["records:before"], data);

		const [sql, values] = nql({
			type: "update",
			table: this.name,
			set: data,
			where: query,
		});

		return this.db.run(sql, values);
	}

	async delete(query) {
		const [sql, values] = nql({
			type: "delete",
			table: this.name,
			where: query,
		});

		return this.db.run(sql, values);
	}
}
