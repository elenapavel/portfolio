import tap from "tape";
import queryFields from "../source/queryFields";
import build from "../source/build";

function run(test, cases, baseQuery, field) {
	for (const { data, expected, itThrows, query = {} } of cases) {
		const sample = { ...baseQuery, ...query, [field]: data };
		const result = typeof expected === "string" ? [expected, []] : expected;

		if (itThrows) {
			test.throws(() => build(sample));
		} else {
			test.same(build(sample), result);
		}
	}
}

tap.test("table", test => {
	const cases = [
		{
			data: "tbl",
			expected: `SELECT "tbl".* FROM "tbl"`,
		},
		{
			data: { name: "tbl", as: "t" },
			expected: `SELECT "t".* FROM "tbl" AS "t"`,
		},
		{
			data: ["tbl", "t"],
			expected: `SELECT "t".* FROM "tbl" AS "t"`,
		},
		{
			data: null,
			itThrows: true,
		},
	];

	const query = { type: "select", columns: "*" };

	run(test, cases, query, "table");
	test.ok(queryFields.get("table"));
	test.end();
});

tap.test("columns", test => {
	const cases = [
		{
			data: "*",
			expected: `SELECT "tbl".* FROM "tbl"`,
		},
		{
			data: "foo",
			expected: `SELECT "tbl"."foo" FROM "tbl"`,
		},
		// array
		{
			data: ["foo", "bar"],
			expected: `SELECT "tbl"."foo", "tbl"."bar" FROM "tbl"`,
		},
		{
			data: [{ name: "foo", as: "bar" }, "lorem"],
			expected: `SELECT "tbl"."foo" AS "bar", "tbl"."lorem" FROM "tbl"`,
		},
		// object
		{
			data: { foo: "bar", lorem: "ipsum" },
			expected: `SELECT "tbl"."foo" AS "bar", "tbl"."lorem" AS "ipsum" FROM "tbl"`,
		},
	];

	const query = { type: "select", table: "tbl" };

	run(test, cases, query, "columns");
	test.ok(queryFields.get("columns"));
	test.end();
});

tap.test("distinct", test => {
	const cases = [
		{
			data: null,
			expected: `SELECT "tbl".* FROM "tbl"`,
		},
		{
			data: true,
			expected: `SELECT DISTINCT "tbl".* FROM "tbl"`,
		},
	];

	const query = { type: "select", table: "tbl", columns: "*" };

	run(test, cases, query, "distinct");
	test.ok(queryFields.get("distinct"));
	test.end();
});

tap.test("count", test => {
	const cases = [
		{
			data: "*",
			expected: `SELECT COUNT(*) FROM "tbl"`,
		},
		{
			data: "foo",
			expected: `SELECT COUNT("tbl"."foo") FROM "tbl"`,
		},
		{
			data: ["foo", "bar"],
			expected: `SELECT COUNT("tbl"."foo"), COUNT("tbl"."bar") FROM "tbl"`,
		},
		{
			data: [],
			expected: `SELECT FROM "tbl"`,
		},
		{
			data: [{ distinct: true, column: "*" }],
			expected: `SELECT COUNT(DISTINCT *) FROM "tbl"`,
		},
		{
			data: [{ distinct: true, column: "foo" }],
			expected: `SELECT COUNT(DISTINCT "tbl"."foo") FROM "tbl"`,
		},
		{
			data: [{ distinct: true, column: "*", as: "foo" }],
			expected: `SELECT COUNT(DISTINCT *) AS "foo" FROM "tbl"`,
		},
		{
			data: { distinct: true, column: "*" },
			expected: `SELECT COUNT(DISTINCT *) FROM "tbl"`,
		},
		{
			data: { distinct: true, column: "*" },
			expected: `SELECT "tbl"."foo" , COUNT(DISTINCT *) FROM "tbl"`,
			query: { columns: ["foo"] },
		},
		{
			data: "*",
			expected: `SELECT "tbl"."foo" , COUNT(*) FROM "tbl"`,
			query: { columns: ["foo"] },
		},
	];

	const query = { type: "select", table: "tbl" };

	run(test, cases, query, "count");
	test.ok(queryFields.get("count"));
	test.end();
});

tap.test("ifNotExists", test => {
	const cases = [
		{
			data: null,
			expected: `CREATE TABLE "tbl"`,
		},
		{
			data: true,
			expected: `CREATE TABLE IF NOT EXISTS "tbl"`,
		},
	];

	const query = { type: "create table", table: "tbl" };

	run(test, cases, query, "ifNotExists");
	test.ok(queryFields.get("ifNotExists"));
	test.end();
});

tap.test("where", test => {
	const cases = [
		{
			data: { foo: "bar", baz: { $in: ["1", "2"] } },
			expected: [
				`SELECT "tbl".* FROM "tbl" WHERE "tbl"."foo" == ? AND "tbl"."baz" IN (?, ?)`,
				["bar", "1", "2"],
			],
		},
		{
			data: "something",
			itThrows: true,
		},
		{
			data: 12.75,
			itThrows: true,
		},
	];

	const query = { type: "select", table: "tbl", columns: "*" };

	run(test, cases, query, "where");
	test.ok(queryFields.get("where"));
	test.end();
});

tap.test("orderBy", test => {
	const cases = [
		{
			data: "foo",
			expected: `SELECT "tbl".* FROM "tbl" ORDER BY "tbl"."foo"`,
		},
		{
			data: ["foo", "bar"],
			expected: `SELECT "tbl".* FROM "tbl" ORDER BY "tbl"."foo", "tbl"."bar"`,
		},
		{
			data: { $asc: ["foo", "bar"] },
			expected: `SELECT "tbl".* FROM "tbl" ORDER BY "tbl"."foo", "tbl"."bar" ASC`,
		},
		{
			data: { $desc: ["foo", "bar"] },
			expected: `SELECT "tbl".* FROM "tbl" ORDER BY "tbl"."foo", "tbl"."bar" DESC`,
		},
		{
			data: { $desc: ["foo"], $asc: ["bar"] },
			expected: `SELECT "tbl".* FROM "tbl" ORDER BY "tbl"."bar" ASC, "tbl"."foo" DESC`,
		},
		{
			data: { foo: "desc", bar: "desc" },
			expected: `SELECT "tbl".* FROM "tbl" ORDER BY "tbl"."foo", "tbl"."bar" DESC`,
		},
		{
			data: { $asc: ["foo", "bar"], baz: "desc", lorem: "asc" },
			expected: `SELECT "tbl".* FROM "tbl" ORDER BY "tbl"."foo", "tbl"."bar", "tbl"."lorem" ASC, "tbl"."baz" DESC`,
		},
	];

	const query = { type: "select", table: "tbl", columns: "*" };

	run(test, cases, query, "orderBy");
	test.ok(queryFields.get("orderBy"));
	test.end();
});

tap.test("groupBy", test => {
	const cases = [
		{
			data: "foo",
			expected: `SELECT "tbl".* FROM "tbl" GROUP BY "tbl"."foo"`,
		},
		{
			data: ["foo", "bar"],
			expected: `SELECT "tbl".* FROM "tbl" GROUP BY "tbl"."foo", "tbl"."bar"`,
		},
		{
			data: [],
			expected: `SELECT "tbl".* FROM "tbl"`,
		},
	];

	const query = { type: "select", table: "tbl", columns: "*" };

	run(test, cases, query, "groupBy");
	test.ok(queryFields.get("groupBy"));
	test.end();
});

tap.test("limit", test => {
	const cases = [
		{
			data: 120,
			expected: [`SELECT "tbl".* FROM "tbl" LIMIT ?`, [120]],
		},
		{
			data: "120",
			expected: [`SELECT "tbl".* FROM "tbl" LIMIT ?`, [120]],
		},
		{
			data: [],
			itThrows: true,
		},
		{
			data: {},
			itThrows: true,
		},
	];

	const query = { type: "select", table: "tbl", columns: "*" };

	run(test, cases, query, "limit");
	test.ok(queryFields.get("limit"));
	test.end();
});

tap.test("offset", test => {
	const cases = [
		{
			data: 120,
			expected: [`SELECT "tbl".* FROM "tbl" OFFSET ?`, [120]],
		},
		{
			data: "120",
			expected: [`SELECT "tbl".* FROM "tbl" OFFSET ?`, [120]],
		},
		{
			data: [],
			itThrows: true,
		},
		{
			data: {},
			itThrows: true,
		},
	];

	const query = { type: "select", table: "tbl", columns: "*" };

	run(test, cases, query, "offset");
	test.ok(queryFields.get("offset"));
	test.end();
});

tap.test("values", test => {
	const cases = [
		{
			data: { foo: null },
			expected: [`INSERT INTO "tbl" ("foo") VALUES (NULL)`, []],
		},
		{
			data: { foo: "bar", lorem: "ipsum" },
			expected: [
				`INSERT INTO "tbl" ("foo", "lorem") VALUES (?, ?)`,
				["bar", "ipsum"],
			],
		},
		{
			data: { foo: "bar", lorem: null, ipsum: 100 },
			expected: [
				`INSERT INTO "tbl" ("foo", "lorem", "ipsum") VALUES (?, NULL, ?)`,
				["bar", 100],
			],
		},
	];

	const query = { type: "insert", table: "tbl" };

	run(test, cases, query, "values");
	test.ok(queryFields.get("values"));
	test.end();
});

tap.test("set", test => {
	const cases = [
		{
			data: { foo: "bar" },
			expected: [`UPDATE "tbl" SET "foo" = ?`, ["bar"]],
		},
		{
			data: { foo: "bar", lorem: null, ipsum: 100 },
			expected: [
				`UPDATE "tbl" SET "foo" = ?, "lorem" = NULL, "ipsum" = ?`,
				["bar", 100],
			],
		},
	];

	const query = { type: "update", table: "tbl" };

	run(test, cases, query, "set");
	test.ok(queryFields.get("set"));
	test.end();
});

tap.test("upsert", test => {
	const cases = [
		{
			data: "uid",
			expected: [
				'INSERT INTO "tbl" ("foo", "lorem", "ipsum") VALUES (?, NULL, ?) ON CONFLICT("uid") DO UPDATE SET foo=excluded.foo, lorem=excluded.lorem, ipsum=excluded.ipsum',
				["bar", 100],
			],
		},
		{
			data: ["id", ["foo", "ipsum"]],
			expected: [
				'INSERT INTO "tbl" ("foo", "lorem", "ipsum") VALUES (?, NULL, ?) ON CONFLICT("id") DO UPDATE SET foo=excluded.foo, ipsum=excluded.ipsum',
				["bar", 100],
			],
		},
	];

	const query = {
		values: { foo: "bar", lorem: null, ipsum: 100 },
		type: "insert",
		table: "tbl",
	};

	run(test, cases, query, "upsert");
	test.ok(queryFields.get("upsert"));
	test.end();
});

tap.test("join", test => {
	const cases = [
		{
			data: {
				type: "left",
				table: "tbl2",
				columns: "*",
				on: { uid: "id" },
			},
			query: { columns: "*" },
			expected: `SELECT "tbl".*, "tbl2".* FROM "tbl" LEFT JOIN "tbl2" ON "tbl"."uid" = "tbl2"."id"`,
		},
		{
			data: {
				table: "tbl2",
				columns: { lorem: "ipsum", sit: "dolor" },
				on: { uid: "id" },
			},
			query: { columns: { nim: "ares" } },
			expected: `SELECT "tbl"."nim" AS "ares", "tbl2"."lorem" AS "ipsum", "tbl2"."sit" AS "dolor" FROM "tbl" INNER JOIN "tbl2" ON "tbl"."uid" = "tbl2"."id"`,
		},
		{
			data: {
				type: "left",
				table: "tbl2",
				columns: "*",
				on: { uid: "id" },
			},
			query: { columns: "*" },
			expected: `SELECT "tbl".*, "tbl2".* FROM "tbl" LEFT JOIN "tbl2" ON "tbl"."uid" = "tbl2"."id"`,
		},
		{
			data: {
				type: "INNER",
				table: { name: "tbl2", as: "t2" },
				columns: "*",
				on: { id: "uid" },
			},
			query: { table: { name: "tbl", as: "t1" }, columns: "*" },
			expected: `SELECT "t1".*, "t2".* FROM "tbl" AS "t1" INNER JOIN "tbl2" AS "t2" ON "t1"."id" = "t2"."uid"`,
		},
		{
			data: [
				{
					type: "INNER",
					table: { name: "tbl2", as: "t2" },
					columns: "*",
					on: { id: "uid" },
				},
				{
					type: "OUTER",
					table: { name: "tbl3", as: "t3" },
					columns: "*",
					on: { id3: "uid3" },
				},
			],
			query: { table: { name: "tbl", as: "t1" }, columns: "*" },
			expected: `SELECT "t1".*, "t2".*, "t3".* FROM "tbl" AS "t1" INNER JOIN "tbl2" AS "t2" ON "t1"."id" = "t2"."uid" OUTER JOIN "tbl3" AS "t3" ON "t1"."id3" = "t3"."uid3"`,
		},
	];

	const query = { type: "select", table: "tbl" };

	run(test, cases, query, "join");
	test.ok(queryFields.get("join"));
	test.end();
});
