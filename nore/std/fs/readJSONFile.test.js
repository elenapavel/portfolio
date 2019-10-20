import tap from "tape";
import { resolve } from "path";
import readJSONFile from "./readJSONFile.js";

const __dirname = import.meta.url.slice(7, import.meta.url.lastIndexOf("/"));

tap.test("readJSONFile - existing path", async ({ ok, end }) => {
	const pkg = await readJSONFile(resolve(__dirname, "../package.json"));

	ok(typeof pkg.name == "string");
	end();
});
