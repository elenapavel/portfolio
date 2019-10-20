import tap from "tape";
import first from "./first.js";

tap.test("get first key from an object", ({ end, equal }) => {
	equal(first({ foo: 123, bar: 321 }), 123);
	equal(first({ bar: 321 }), 321);

	end();
});
