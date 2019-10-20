import tap from "tape";
import JSONSchema from "../source";

const states = ["pending", "active", "suspended", "locked", "archived"];
const groups = ["members", "buyers", "sellers", "admins"];

const schema = JSONSchema({
	table: "accounts",
	type: "object",
	properties: {
		id: {
			type: "string",
		},
		email: {
			type: "string",
		},
		password: {
			type: "string",
		},
		balance: {
			type: "number",
			default: 0.0,
		},
		groups: {
			type: "array",
			items: { type: "string", enum: groups },
			default: ["members"],
		},
		state: {
			type: "string",
			enum: states,
			default: "pending",
		},
		createdAt: {
			type: "number",
		},
		updatedAt: {
			type: "number",
		},
	},
	required: ["id", "email", "password", "createdAt"],
	unique: ["id", "email"],
	primaryKeys: ["id"],
});

const sample = {
	id: "3u298fuwejoiaf",
	email: "user@server.com",
	password: "u39fnouw8fycccccgnoq387gx38yn",
	groups: ["members"],
	state: "active",
	updatedAt: Date.now(),
	createdAt: Date.now(),
};

const sql = `CREATE TABLE accounts (id TEXT PRIMARY KEY NOT NULL UNIQUE, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL, balance INTEGER, groups TEXT, state TEXT, createdAt INTEGER NOT NULL, updatedAt INTEGER);`;

tap.test("sample", ({ ok, equal, end }) => {
	ok(schema.validate(sample));
	equal(schema.toSQL(), sql);

	end();
});
