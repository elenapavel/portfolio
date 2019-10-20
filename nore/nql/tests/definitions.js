import tap from "tape";
import { toSQL } from "../source/queryFields/definitions.js";

tap.test("definitions", async ({ end, equal }) => {
	const cases = [
		{
			data: [{ name: "foo", type: "text" }],
			expected: `"foo" TEXT`,
		},
		{
			data: [{ name: "foo", type: "text", isNullable: true }],
			expected: `"foo" TEXT`,
		},
		{
			data: [{ name: "foo", type: "text", default: "lorem" }],
			expected: `"foo" TEXT DEFAULT 'lorem'`,
		},
		{
			data: [{ name: "foo", type: "text", isPrimaryKey: true }],
			expected: `"foo" TEXT PRIMARY KEY NOT NULL`,
		},
		{
			data: [{ name: "foo", type: "integer", isAutoIncrement: true }],
			expected: `"foo" INTEGER AUTOINCREMENT`,
		},
		{
			data: [{ name: "foo", type: "text", isNullable: false }],
			expected: `"foo" TEXT NOT NULL`,
		},
		{
			data: [{ name: "foo", type: "text", isUnique: true }],
			expected: `"foo" TEXT UNIQUE`,
		},
		{
			data: [{ name: "foo", type: "text", isPrimaryKey: ["lorem(ipsum)"] }],
			expected: `"foo" TEXT PRIMARY KEY NOT NULL`,
		},
		{
			data: [{ name: "foo", foreignKey: ["lorem", "ipsum"] }],
			expected: `"foo" TEXT, FOREIGN KEY ("foo") REFERENCES "lorem" ("ipsum")`,
		},
		{
			data: [
				{ name: "foo", type: "text", isPrimaryKey: true },
				{ name: "bar", type: "real", isUnique: true },
				{ name: "baz", type: "text", default: "foobar" },
				{ name: "lorem", type: "integer", foreignKey: ["baz", "sit"] },
				{ name: "ipsum", type: "integer", foreignKey: ["baz", "dolor"] },
			],
			expected: `"foo" TEXT PRIMARY KEY NOT NULL, "bar" REAL UNIQUE, "baz" TEXT DEFAULT 'foobar', "lorem" INTEGER, "ipsum" INTEGER, FOREIGN KEY ("lorem") REFERENCES "baz" ("sit"), FOREIGN KEY ("ipsum") REFERENCES "baz" ("dolor")`,
		},
	];

	for (const { data, expected } of cases) {
		equal(toSQL(data), expected);
	}

	end();
});
