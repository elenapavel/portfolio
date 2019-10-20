import tap from "tape";
import getFileStatus from "./getFileStatus.js";

const __filename = import.meta.url.substring(7);

tap.test("getFileStatus - existing path", async ({ ok, notOk, end }) => {
	const stats = await getFileStatus(__filename);

	ok(stats.isFile());
	notOk(stats.isDirectory());

	end();
});
