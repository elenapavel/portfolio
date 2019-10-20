import tap from "tape";
import Database from "../source";
import * as util from "./utils";

const columns = [
	{ name: "id", type: "text", isPrimaryKey: true },
	{ name: "lorem", type: "text", isUnique: true },
	{ name: "ipsum", type: "real", default: 100 },
	{ name: "sit", type: "integer" },
];

const samples = util.getRandomData(columns, 50);
const dbFile = util.getTemporaryFile();
const db = new Database({ file: dbFile.path });

tap.test("table", async ({ end, equal, same, ok, throws }) => {
	const tableName = util.getRandomString();
	const table = db.table(tableName);

	// create table
	await table.create(columns);

	// rename table
	var result = await table.rename(util.getRandomString());
	ok(table.name !== tableName);

	// insert data
	var result = await table.insert(samples);
	same(result, { changes: 50, lastInsertRowid: 50 });

	// count
	var result = await table.count();
	ok(result === 50);
	var result = await table.count("ipsum");
	ok(result < 50);

	// find
	var sample = samples[util.getRandomInt(0, 50 - 1)];
	var result = await table.find({ id: sample.id });
	equal(result.length, 1);
	same(result[0], sample);

	// find -> no result
	var result = await table.find({ lorem: "found" });
	same(result, []);

	// upsert
	var sample = samples[0];
	sample.lorem = "changed";
	sample.sit = "changed";
	var result = await table.upsert(sample);
	equal(await table.count(), 50);
	var sample = util.getRandomData(columns, 1).pop();
	var result = await table.upsert(sample);
	equal(await table.count(), 51);

	// update
	var sample = samples[util.getRandomInt(10, 50 - 1)];
	await table.update({ id: sample.id }, { lorem: "updated" });
	var result = await table.findOne({ id: sample.id });
	equal(result.lorem, "updated");

	// throws when updating a unique column with an existing value
	try {
		await table.update({ id: samples[1].id }, { lorem: "updated" });
		throw Error("show throw");
	} catch (error) {
		ok(error.message.includes("UNIQUE"));
	}

	// delete
	var result = await table.delete({ lorem: "updated" });
	equal(result.changes, 1);
	var result = await table.findOne({ id: sample.id });
	ok(result == null);

	// add IDs by default
	await table.insert([
		{ id: "sample_id", lorem: "lorem_sample" },
		{ id: undefined, lorem: "lorem_demo" },
	]);
	var records = await table.find({
		lorem: { $in: ["lorem_sample", "lorem_demo"] },
	});
	ok(records.length === 2);
	ok(records[0].id);
	ok(records[1].id);

	// drop table
	await table.drop();
	equal(table.isDeleted, true);

	try {
		await table.db.get(`SELECT * FROM ${tableName}`);
	} catch (error) {
		equal(error.message, `no such table: ${tableName}`);
	}

	end();
});

tap.tearDown(() => dbFile.delete());
