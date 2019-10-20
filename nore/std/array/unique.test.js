import tap from "tape";
import unique from "./unique.js";

tap.test("remove duplicates", ({ end, same }) => {
	const sample = ["a", "b", "e", "f", "e", "b", "m"];
	const expected = ["a", "b", "e", "f", "m"];

	same(unique(sample), expected);
	end();
});
