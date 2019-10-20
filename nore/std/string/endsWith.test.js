import tap from "tape";
import endsWith from "./endsWith.js";

tap.test("endsWith", ({ ok, notOk, end }) => {
	const sample = "/path/to/file";

	ok(endsWith(sample, "file"));
	ok(endsWith(sample, "e"));
	ok(endsWith(sample, "/path/to/file"));

	notOk(endsWith(sample, "123"));
	notOk(endsWith(sample, ""));

	end();
});
