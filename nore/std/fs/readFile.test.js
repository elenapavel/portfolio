import tap from "tape";
import readFile from "./readFile.js";

const __filename = import.meta.url.substring(7);

tap.test("readFile - default", async ({ ok, end }) => {
	const data = await readFile(__filename);

	ok(data.includes("await readFile(__filename)"));
	end();
});

tap.test("readFile - option.encoding", async ({ ok, end }) => {
	const data = await readFile(__filename, { encoding: null });

	ok(Buffer.isBuffer(data));
	end();
});
