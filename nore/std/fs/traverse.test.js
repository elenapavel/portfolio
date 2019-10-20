import { resolve } from "path";
import tap from "tape";
import traverse from "./traverse.js";

const __dirname = import.meta.url.slice(7, import.meta.url.lastIndexOf("/"));

tap.test("traverse", async ({ ok, end }) => {
	const pkg = resolve(`${__dirname}/..`);
	const files = await traverse(pkg);

	ok(files.includes(`${pkg}/fs/traverse.js`));
	ok(files.includes(`${pkg}/fs/traverse.test.js`));

	end();
});

tap.test("traverse - options.depth", async ({ ok, end }) => {
	const pkg = resolve(`${__dirname}/..`);
	const files = await traverse(pkg, { depth: 0 });

	ok(files.includes(`${pkg}/package.json`));
	ok(!files.includes(`${pkg}/fs/traverse.test.js`));

	end();
});

tap.test("traverse - invalid or missing path", ({ rejects, end }) => {
	rejects(traverse());
	rejects(traverse("non-existing"));

	end();
});
