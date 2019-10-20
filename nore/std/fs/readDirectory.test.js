import tap from "tape";
import readDirectory from "./readDirectory.js";

const __dirname = import.meta.url.slice(7, import.meta.url.lastIndexOf("/"));
const __filename = import.meta.url.substring(7);

tap.test("readDirectory - existing path", async ({ ok, end }) => {
	const files = await readDirectory(__dirname);

	ok(files.includes(__filename));
	end();
});

tap.test("readDirectory - invalid or missing path", ({ rejects, end }) => {
	rejects(readDirectory());
	rejects(readDirectory({}));
	rejects(readDirectory("non-existing"));

	end();
});
