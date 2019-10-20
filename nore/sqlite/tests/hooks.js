import tap from "tape";
import * as util from "./utils";
import Database from "../source";

const columns = [
	{ name: "id", type: "text", isPrimaryKey: true },
	{ name: "lorem", type: "text", isUnique: true },
];

const samples = util.getRandomData(columns, 50);
const dbFile = util.getTemporaryFile();
const db = new Database({ file: dbFile.path });

tap.test("hooks", async ({ end, equal, same, ok, throws }) => {
	const tableName = util.getRandomString();
	const table = db.table(tableName);

	// create table
	await table.create(columns);

	// add hooks
	table.hook("records:before", records => {
		for (const record of records) {
			record.lorem = record.lorem.join(",");
		}
	});

	table.hook("records:after", records => {
		for (const record of records) {
			record.lorem = record.lorem.split(",");
		}
	});

	// insert a record
	await table.insert({
		id: "one",
		lorem: ["foo", "bar"],
	});

	// retrieve a record
	const result = await table.findOne({ id: "one" });

	same(result, {
		id: "one",
		lorem: ["foo", "bar"],
	});

	end();
});
