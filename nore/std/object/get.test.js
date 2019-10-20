import tap from "tape";
import get from "./get.js";

tap.test("get value by single key", ({ end, equal }) => {
	const source = { foo: "bar" };
	const value = get(source, ["foo"]);

	equal(value, "bar");
	end();
});

tap.test("get value by deep path", ({ end, equal }) => {
	const source = { foo: { bar: { baz: "lorem" } } };
	const value = get(source, ["foo", "bar", "baz"]);

	equal(value, "lorem");
	end();
});

tap.test("get mixed values (array and objects)", ({ end, equal, same }) => {
	const source = {
		a: { locals: { name: { first: "Brian" } } },
		b: { locals: { name: { last: "Woodward" } } },
		c: { locals: { paths: ["a.txt", "b.js", "c.hbs"] } },
	};

	same(get(source, ["a", "locals", "name"]), { first: "Brian" });
	same(get(source, ["b", "locals", "name"]), { last: "Woodward" });
	equal(get(source, ["b", "locals", "name", "last"]), "Woodward");
	equal(get(source, ["c", "locals", "paths", "0"]), "a.txt");
	equal(get(source, ["c", "locals", "paths", "1"]), "b.js");
	equal(get(source, ["c", "locals", "paths", "2"]), "c.hbs");

	end();
});

tap.test("return undefine if no value on path", ({ end, equal }) => {
	const source = { foo: { bar: "baz" } };

	equal(get(source, []), undefined);
	equal(get(source, ["foo", "boom"]), undefined);
	equal(get(source, ["foo", "bar", "boom"]), undefined);
	end();
});
