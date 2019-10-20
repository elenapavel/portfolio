import tap from "tape";
import queryFields from "../source/queryFields";
import build from "../source/build";

const where = queryFields.get("where");
const query = { type: "select", columns: "*", table: "tbl" };
const subQuery = { ...query, where: { foo: "bar" } };
const subQueryOutput = `SELECT "tbl".* FROM "tbl" WHERE "tbl"."foo" == ?`;
const getWhereOutput = data => where(data, { ...query, where: data }, build);

const run = (cases, test) => {
	cases.forEach(({ where, sql, values }) => {
		const result = getWhereOutput(where);

		if (result === null) {
			test.equal(result, null);
		} else if (Array.isArray(result)) {
			test.equal(result[0], `WHERE ${sql}`);
			test.same(result[1], values);
		} else {
			test.equal(result, `WHERE ${sql}`);
		}
	});
};

tap.test("$is", test => {
	const cases = [
		{
			where: { foo: "bar" },
			sql: `"tbl"."foo" == ?`,
			values: ["bar"],
		},
		{
			where: { foo: "bar", bar: 25 },
			sql: `"tbl"."foo" == ? AND "tbl"."bar" == ?`,
			values: ["bar", 25],
		},
		{
			where: { foo: { $is: "bar" }, lorem: true },
			sql: `"tbl"."foo" == ? AND "tbl"."lorem" IS TRUE`,
			values: ["bar"],
		},
		{
			where: { foo: { $is: "bar" }, lorem: false },
			sql: `"tbl"."foo" == ? AND "tbl"."lorem" IS FALSE`,
			values: ["bar"],
		},
		{
			where: { foo: { $is: "bar" }, lorem: null },
			sql: `"tbl"."foo" == ? AND "tbl"."lorem" IS NULL`,
			values: ["bar"],
		},
		{
			where: { isTrue: true, isFalse: false, isNull: null },
			sql: `"tbl"."isTrue" IS TRUE AND "tbl"."isFalse" IS FALSE AND "tbl"."isNull" IS NULL`,
			values: [],
		},
	];

	run(cases, test);
	test.end();
});

tap.test("$not", test => {
	const cases = [
		{
			where: { foo: { $not: "bar" } },
			sql: `"tbl"."foo" != ?`,
			values: ["bar"],
		},
		{
			where: { $not: { foo: "bar", bar: "lorem", nop: null } },
			sql: `"tbl"."foo" != ? AND "tbl"."bar" != ? AND "tbl"."nop" IS NOT NULL`,
			values: ["bar", "lorem"],
		},
		{
			where: { $not: { foo: true } },
			sql: `"tbl"."foo" IS NOT TRUE`,
			values: [],
		},
		{
			where: { $not: { foo: false } },
			sql: `"tbl"."foo" IS NOT FALSE`,
			values: [],
		},
		{
			where: { $not: { foo: null } },
			sql: `"tbl"."foo" IS NOT NULL`,
			values: [],
		},
		{
			where: { foo: { $not: null } },
			sql: `"tbl"."foo" IS NOT NULL`,
			values: [],
		},
	];

	run(cases, test);
	test.end();
});

tap.test("$isNull", test => {
	const cases = [
		{
			where: { foo: { $isNull: true } },
			sql: `"tbl"."foo" IS NULL`,
			values: [],
		},
		{
			where: { foo: { $isNull: false } },
			sql: `"tbl"."foo" IS NOT NULL`,
			values: [],
		},
		{
			where: { $isNull: ["foo", "bar"] },
			sql: `"tbl"."foo" IS NULL AND "tbl"."bar" IS NULL`,
			values: [],
		},
		{
			where: { $isNull: [] },
		},
	];

	run(cases, test);
	test.end();
});

tap.test("$gt", test => {
	const cases = [
		{
			where: { foo: { $gt: 25 } },
			sql: `"tbl"."foo" > ?`,
			values: [25],
		},
		{
			where: { $gt: { foo: 25 } },
			sql: `"tbl"."foo" > ?`,
			values: [25],
		},
		{
			where: { $gt: { foo: 25, bar: "lorem" } },
			sql: `"tbl"."foo" > ? AND "tbl"."bar" > ?`,
			values: [25, "lorem"],
		},
	];

	run(cases, test);
	test.end();
});

tap.test("$gte", test => {
	const cases = [
		{
			where: { foo: { $gte: 25 } },
			sql: `"tbl"."foo" >= ?`,
			values: [25],
		},
		{
			where: { $gte: { foo: 25 } },
			sql: `"tbl"."foo" >= ?`,
			values: [25],
		},
		{
			where: { $gte: { foo: 25, bar: "lorem" } },
			sql: `"tbl"."foo" >= ? AND "tbl"."bar" >= ?`,
			values: [25, "lorem"],
		},
	];

	run(cases, test);
	test.end();
});

tap.test("$lt", test => {
	const cases = [
		{
			where: { foo: { $lt: 25 } },
			sql: `"tbl"."foo" < ?`,
			values: [25],
		},
		{
			where: { $lt: { foo: 25 } },
			sql: `"tbl"."foo" < ?`,
			values: [25],
		},
		{
			where: { $lt: { foo: 25, bar: "lorem" } },
			sql: `"tbl"."foo" < ? AND "tbl"."bar" < ?`,
			values: [25, "lorem"],
		},
	];

	run(cases, test);
	test.end();
});

tap.test("$lte", test => {
	const cases = [
		{
			where: { foo: { $lte: 25 } },
			sql: `"tbl"."foo" <= ?`,
			values: [25],
		},
		{
			where: { $lte: { foo: 25 } },
			sql: `"tbl"."foo" <= ?`,
			values: [25],
		},
		{
			where: { $lte: { foo: 25, bar: "lorem" } },
			sql: `"tbl"."foo" <= ? AND "tbl"."bar" <= ?`,
			values: [25, "lorem"],
		},
	];

	run(cases, test);
	test.end();
});

tap.test("$or", test => {
	const cases = [
		{
			where: { $or: { foo: 25, bar: "lorem" } },
			sql: `"tbl"."foo" == ? OR "tbl"."bar" == ?`,
			values: [25, "lorem"],
		},
		{
			where: { $or: { $not: { foo: 25, bar: "lorem" } } },
			sql: `"tbl"."foo" != ? OR "tbl"."bar" != ?`,
			values: [25, "lorem"],
		},
	];

	run(cases, test);
	test.end();
});

tap.test("$and", test => {
	const cases = [
		{
			where: { $or: { foo: 25, $and: { bar: 20, baz: 15 } } },
			sql: `"tbl"."foo" == ? OR "tbl"."bar" == ? AND "tbl"."baz" == ?`,
			values: [25, 20, 15],
		},
	];

	run(cases, test);
	test.end();
});

tap.test("$in", test => {
	const cases = [
		{
			where: { foo: { $in: ["bar", null, false, "baz", undefined] } },
			sql: `"tbl"."foo" IN (?, ?) OR "tbl"."foo" IS NULL OR "tbl"."foo" IS FALSE`,
			values: ["bar", "baz"],
		},
		{
			where: { foo: { $in: [null] } },
			sql: `"tbl"."foo" IS NULL`,
			values: [],
		},
		{
			where: { foo: { $in: subQuery } },
			sql: `"tbl"."foo" IN (${subQueryOutput})`,
			values: ["bar"],
		},
		{
			where: { foo: { $in: [] } },
		},
	];

	run(cases, test);
	test.end();
});

tap.test("$nin", test => {
	const cases = [
		{
			where: { foo: { $nin: ["foo", "bar", "baz"] } },
			sql: `"tbl"."foo" NOT IN (?, ?, ?)`,
			values: ["foo", "bar", "baz"],
		},
		{
			where: { foo: { $nin: ["bar", false, null, undefined, "baz"] } },
			sql: `"tbl"."foo" NOT IN (?, ?) OR "tbl"."foo" IS NOT FALSE OR "tbl"."foo" IS NOT NULL`,
			values: ["bar", "baz"],
		},
		{
			where: { foo: { $nin: [] } },
		},
	];

	run(cases, test);
	test.end();
});

tap.test("$between", test => {
	const cases = [
		{
			where: { $between: { foo: ["bar", "baz"] } },
			sql: `"tbl"."foo" BETWEEN ? AND ?`,
			values: ["bar", "baz"],
		},
		{
			where: { foo: { $between: ["bar", "baz"] } },
			sql: `"tbl"."foo" BETWEEN ? AND ?`,
			values: ["bar", "baz"],
		},
		{
			where: { foo: { $between: [] } },
		},
	];

	run(cases, test);
	test.end();
});

tap.test("$like", test => {
	const cases = [
		{
			where: { foo: { $like: "bar" } },
			sql: `"tbl"."foo" LIKE ?`,
			values: ["bar"],
		},
		{
			where: { $like: { foo: "bar", bar: "lorem" } },
			sql: `"tbl"."foo" LIKE ? AND "tbl"."bar" LIKE ?`,
			values: ["bar", "lorem"],
		},
		{
			where: { $or: { $like: { foo: "bar", bar: "lorem" } } },
			sql: `"tbl"."foo" LIKE ? OR "tbl"."bar" LIKE ?`,
			values: ["bar", "lorem"],
		},
		{
			where: { $nlike: null },
		},
	];

	run(cases, test);
	test.end();
});

tap.test("$nlike", test => {
	const cases = [
		{
			where: { foo: { $nlike: "bar" } },
			sql: `"tbl"."foo" NOT LIKE ?`,
			values: ["bar"],
		},
		{
			where: { $nlike: { foo: "bar", bar: "lorem" } },
			sql: `"tbl"."foo" NOT LIKE ? AND "tbl"."bar" NOT LIKE ?`,
			values: ["bar", "lorem"],
		},
		{
			where: { $nlike: null },
		},
	];

	run(cases, test);
	test.end();
});

tap.test("$match", test => {
	const cases = [
		{
			where: { foo: { $match: "bar" } },
			sql: `"tbl"."foo" GLOB ?`,
			values: ["bar"],
		},
		{
			where: { $match: { foo: "bar", bar: "lorem" } },
			sql: `"tbl"."foo" GLOB ? AND "tbl"."bar" GLOB ?`,
			values: ["bar", "lorem"],
		},
		{
			where: { $or: { $match: { foo: "bar", bar: "lorem" } } },
			sql: `"tbl"."foo" GLOB ? OR "tbl"."bar" GLOB ?`,
			values: ["bar", "lorem"],
		},
	];

	run(cases, test);
	test.end();
});

tap.test("$sql", test => {
	const cases = [
		{
			where: { $sql: ["foo == ? OR bar == ?", "lorem", "ipsum"] },
			sql: `foo == ? OR bar == ?`,
			values: ["lorem", "ipsum"],
		},
		{
			where: { $sql: "foo IS NOT FALSE" },
			sql: `foo IS NOT FALSE`,
			values: [],
		},
	];

	run(cases, test);
	test.end();
});
