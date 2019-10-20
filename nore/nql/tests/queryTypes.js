import tap from "tape";
import build from "../source";
import queryTypes from "../source/queryTypes";

tap.test("select", ({ end, equal, same }) => {
	const result = build({
		type: "select",
		table: "tbl",
		count: "*",
		where: { lorem: "ipsum" },
	});
	const expected = [
		`SELECT COUNT(*) FROM "tbl" WHERE "tbl"."lorem" == ?`,
		["ipsum"],
	];

	same(result, expected);
	end();
});

tap.test("insert", ({ end, equal, same }) => {
	const result = build({
		type: "insert",
		table: "foo",
		values: { foo: "bar", lorem: null, ipsum: 25 },
		upsert: "foo",
	});

	const expected = [
		'INSERT INTO "foo" ("foo", "lorem", "ipsum") VALUES (?, NULL, ?) ON CONFLICT("foo") DO UPDATE SET lorem=excluded.lorem, ipsum=excluded.ipsum',
		["bar", 25],
	];

	same(result, expected);
	end();
});

tap.test("update", ({ end, equal, same }) => {
	const result = build({
		type: "update",
		table: "tbl",
		set: { foo: "bar", lorem: null, ipsum: 25 },
	});

	const expected = [
		`UPDATE "tbl" SET "foo" = ?, "lorem" = NULL, "ipsum" = ?`,
		["bar", 25],
	];

	same(result, expected);
	end();
});

tap.test("delete", ({ end, equal, same }) => {
	const result = build({
		type: "delete",
		table: "tbl",
		where: { lorem: "ipsum" },
	});

	const expected = [`DELETE FROM "tbl" WHERE "tbl"."lorem" == ?`, ["ipsum"]];

	same(result, expected);
	end();
});

tap.test("create table", ({ end, equal, same }) => {
	const result = build({
		type: "create table",
		table: "tbl",
		definitions: [
			{ name: "foo", type: "text", isPrimaryKey: true },
			{ name: "bar", type: "text", default: "foobar" },
			{ name: "baz", type: "real", isUnique: true },
		],
	});

	const expected = [
		`CREATE TABLE "tbl" ("foo" TEXT PRIMARY KEY NOT NULL, "bar" TEXT DEFAULT 'foobar', "baz" REAL UNIQUE)`,
		[],
	];

	same(result, expected);
	end();
});
