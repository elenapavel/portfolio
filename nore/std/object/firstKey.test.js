import tap from "tape";
import firstKey from "./firstKey.js";

tap.test("get first key from an object", ({ end, equal }) => {
	equal(firstKey({ foo: 123, bar: 321 }), "foo");
	equal(firstKey({ bar: 321 }), "bar");

	end();
});
