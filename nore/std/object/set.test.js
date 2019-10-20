import tap from "tape";
import set from "./set.js";

tap.test("add simple key:value", ({ end, equal }) => {
	const target = { foo: "bar" };

	set(target, ["foo"], "baz");
	equal(target.foo, "baz");

	end();
});

tap.test("mutates nested data", ({ end, equal }) => {
	const target = { foo: { bar: { baz: "lorem" }, bim: null, bor: undefined } };

	set(target, ["foo", "bar", "baz"], "ipsum");
	equal(target.foo.bar.baz, "ipsum");

	set(target, ["foo", "bim", "baz"], "ipsum");
	equal(target.foo.bim.baz, "ipsum");

	set(target, ["foo", "bor", "baz"], "ipsum");
	equal(target.foo.bor.baz, "ipsum");

	end();
});

tap.test("adds nested data", ({ end, same }) => {
	const target = { beep: "boop" };
	const expected = { beep: "boop", foo: { bar: { baz: "ipsum" } } };

	set(target, ["foo", "bar", "baz"], "ipsum");
	same(target, expected);

	end();
});

tap.test("throws if finds string or number on path", ({ end, throws }) => {
	throws(() => {
		set(["foo", "bar", "baz"], "ipsum", { foo: "bar" });
	});

	throws(() => {
		set(["foo", "bar", "baz"], "ipsum", { foo: 0 });
	});

	end();
});
