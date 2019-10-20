import tap from "tape";
import isFile from "./isFile.js";

const __filename = import.meta.url.substring(7);

tap.test("isFile - existing path", async ({ ok, end }) => {
	ok(await isFile(__filename));
	end();
});

tap.test("isFile - non-existing path", async ({ notOk, end }) => {
	notOk(await isFile("non-existing"));
	end();
});
