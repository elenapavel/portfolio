import tap from "tape";
import metaToDefs from "../source/utils/metaToDefs.js";
import parseCreateTableSQL from "../source/utils/parseCreateTableSQL.js";

tap.test("parseCreateTableSQL", ({ end, same }) => {
	var result = parseCreateTableSQL(
		`CREATE TABLE "test" ("id" TEXT PRIMARY KEY NOT NULL UNIQUE)`
	);
	var expected = {
		columns: [`"id" TEXT PRIMARY KEY NOT NULL UNIQUE`],
		foreignKeys: [],
	};
	same(result, expected);

	var result = parseCreateTableSQL(
		`CREATE TABLE "test" ("id" TEXT PRIMARY KEY NOT NULL, FOREIGN KEY ("baz") REFERENCES "foo" ("bar"))`
	);
	var expected = {
		columns: [`"id" TEXT PRIMARY KEY NOT NULL`],
		foreignKeys: [`FOREIGN KEY ("baz") REFERENCES "foo" ("bar")`],
	};
	same(result, expected);

	var result = parseCreateTableSQL(
		`CREATE TABLE "test" ("id" TEXT PRIMARY KEY NOT NULL, "lorem" TEXT UNIQUE, "ipsum" REAL DEFAULT 'foo, bar', "sit" INTEGER UNIQUE, "baz" TEXT, FOREIGN KEY ("baz") REFERENCES "foo" ("bar"), FOREIGN KEY ("hop") REFERENCES "foo" ("asd"), FOREIGN KEY ("gre") REFERENCES "foo" ("bvc"))`
	);
	var expected = {
		columns: [
			`"id" TEXT PRIMARY KEY NOT NULL`,
			`"lorem" TEXT UNIQUE`,
			`"ipsum" REAL DEFAULT 'foo, bar'`,
			`"sit" INTEGER UNIQUE`,
			`"baz" TEXT`,
		],
		foreignKeys: [
			`FOREIGN KEY ("baz") REFERENCES "foo" ("bar")`,
			`FOREIGN KEY ("hop") REFERENCES "foo" ("asd")`,
			`FOREIGN KEY ("gre") REFERENCES "foo" ("bvc")`,
		],
	};
	same(result, expected);

	end();
});

tap.test("metaToDefs", async ({ end, same }) => {
	same(
		metaToDefs({
			cid: 1,
			name: "foo",
			type: "TEXT",
			notnull: 0,
			dflt_value: null,
			pk: 0,
		}),
		{
			name: "foo",
			type: "text",
			default: null,
			isNullable: true,
			isPrimaryKey: false,
			isUnique: false,
		}
	);

	same(
		metaToDefs({
			cid: 1,
			name: "id",
			type: "integer",
			notnull: 1,
			dflt_value: null,
			pk: 1,
		}),
		{
			name: "id",
			type: "integer",
			default: null,
			isNullable: false,
			isPrimaryKey: true,
			isUnique: true,
		}
	);

	end();
});
