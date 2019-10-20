import tap from "tape";
import { getRandomString, getTemporaryFile } from "./utils";
import Database, { timestamp, uid } from "../source";

const dbFile = getTemporaryFile();

const createTableSQL = name => `
	CREATE TABLE ${name} (
		id TEXT PRIMARY KEY,
		foo TEXT NOT NULL,
		bar TEXT NOT NULL
	);
`;

tap.test("Database()", async ({ end, ok, same }) => {
	const db = new Database({ file: dbFile.path });
	const tables = [getRandomString(4), getRandomString(6), getRandomString(8)];

	for (const name of tables) {
		await db.sqlite.run(createTableSQL(name));
	}

	ok(typeof uid() === "string");
	ok(uid().length > 10);

	ok(typeof timestamp() === "string");
	ok(timestamp().length === 17);
	ok(timestamp(new Date()).length === 17);

	var result = await db.list();
	same(result, tables);

	var result = db.table(tables[0]);
	ok(result.name === tables[0]);

	end();
});

tap.tearDown(() => dbFile.delete());
