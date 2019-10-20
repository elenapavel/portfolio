import tap from "tape";
import pick from "./pick.js";

tap.test("pick a property from an object", ({ end, same }) => {
	same(pick({ a: "a", b: "b" }, ["a"]), { a: "a" });

	end();
});

tap.test("pick getter properties", ({ end, equal, ok }) => {
	const source = new Array(1, 2, 3);
	const keys = ["map", "filter", "includes"];
	const result = pick(source, keys);

	ok(result.hasOwnProperty("map"));
	ok(result.hasOwnProperty("includes"));
	ok(result.hasOwnProperty("filter"));
	equal(source.map, result.map);

	end();
});

tap.test("pick a property from a function", ({ end, same }) => {
	function fn() {}
	fn.a = "foo";
	fn.b = "bar";
	same(pick(fn, ["a"]), { a: "foo" });

	end();
});

tap.test("pick multiple properties", ({ end, same }) => {
	same(pick({ a: "a", b: "b", c: "c" }, ["a", "b"]), { a: "a", b: "b" });

	same(pick({ foo: "foo", bar: "bar", baz: "baz" }, ["foo", "bar"]), {
		foo: "foo",
		bar: "bar",
	});

	end();
});

tap.test("ignore keys that do not exist", ({ end, same }) => {
	same(pick({ a: "a", b: "b", c: "c" }, ["a", "b", "foo"]), { a: "a", b: "b" });
	same(pick({ foo: "foo", bar: "bar", baz: "baz" }, ["foo", "bar", "abc"]), {
		foo: "foo",
		bar: "bar",
	});

	end();
});

tap.test("throws arguments are invalid", ({ end, throws }) => {
	throws(() => {
		pick("a", null);
	});
	throws(() => {
		pick("a", false);
	});
	throws(() => {
		pick("a", "");
	});
	throws(() => {
		pick({ a: 1 }, "a");
	});

	end();
});
