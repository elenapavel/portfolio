import tap from "tape";
import isDirectory from "./isDirectory.js";

const __dirname = import.meta.url.slice(7, import.meta.url.lastIndexOf("/"));

tap.test("isDirectory - existing path", async ({ ok, end }) => {
	ok(await isDirectory(__dirname));
	end();
});

tap.test("isDirectory - non-existing path", async ({ notOk, end }) => {
	notOk(await isDirectory("non-existing"));
	end();
});
