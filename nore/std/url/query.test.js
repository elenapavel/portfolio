import tap from "tape";
import query from "./query.js";

tap.test("query strings starting with a `?`", ({ same, end }) => {
	same(query.parse("?foo=bar"), { foo: "bar" });
	end();
});

tap.test("query strings starting with a `#`", ({ same, end }) => {
	same(query.parse("#foo=bar"), { foo: "bar" });
	end();
});

tap.test("query strings starting with a `&`", ({ same, end }) => {
	same(query.parse("&foo=bar&foo=baz"), { foo: ["bar", "baz"] });
	end();
});

tap.test("parse a query string", ({ same, end }) => {
	same(query.parse("foo=bar"), { foo: "bar" });
	end();
});

tap.test("parse multiple query string", ({ same, end }) => {
	same(query.parse("foo=bar&key=val"), {
		foo: "bar",
		key: "val",
	});
	end();
});

tap.test("parse query string without a value", ({ same, end }) => {
	same(query.parse("foo"), { foo: null });
	same(query.parse("foo&key"), {
		foo: null,
		key: null,
	});
	same(query.parse("foo=bar&key"), {
		foo: "bar",
		key: null,
	});
	same(query.parse("a&a"), { a: [null, null] });
	same(query.parse("a=&a"), { a: ["", null] });
	end();
});

tap.test("return empty object if no qss can be found", ({ same, end }) => {
	same(query.parse("?"), {});
	same(query.parse("&"), {});
	same(query.parse("#"), {});
	same(query.parse(" "), {});
	end();
});

tap.test("handle `+` correctly", ({ same, end }) => {
	same(query.parse("foo+faz=bar+baz++"), { "foo faz": "bar baz  " });
	end();
});

tap.test("handle multiple of the same key", ({ same, end }) => {
	same(query.parse("foo=bar&foo=baz"), { foo: ["bar", "baz"] });
	end();
});

tap.test(
	"handle multiple values and preserve appearence order",
	({ same, end }) => {
		same(query.parse("a=value&a="), { a: ["value", ""] });
		same(query.parse("a=&a=value"), { a: ["", "value"] });
		end();
	}
);

tap.test("query strings params including embedded `=`", ({ same, end }) => {
	same(query.parse("?param=https%3A%2F%2Fsomeurl%3Fid%3D2837"), {
		param: "https://someurl?id=2837",
	});
	end();
});

tap.test("object properties", ({ same, throws, end }) => {
	throws(() => query.parse());
	same(query.parse("hasOwnProperty=foo"), { hasOwnProperty: "foo" });
	end();
});

tap.test("circuit parse -> stringify", ({ same, equal, end }) => {
	const original = "foo=bar&key=val&num=124&void";
	const expected = { foo: "bar", key: "val", num: 124, void: null };

	same(query.parse(original), expected);
	equal(query.stringify(expected), original);
	same(query.parse(query.stringify(expected)), expected);

	end();
});

tap.test("stringify", ({ equal, same, end }) => {
	equal(query.stringify({ foo: "bar" }), "foo=bar");
	equal(
		query.stringify({
			bar: "baz",
			foo: "bar",
		}),
		"bar=baz&foo=bar"
	);
	end();
});

tap.test("different types", ({ throws, same, end }) => {
	throws(() => query.stringify());
	throws(() => query.stringify(0));
	throws(() => query.stringify(null));
	throws(() => query.stringify("no"));
	end();
});

tap.test("URI encode", ({ equal, same, end }) => {
	equal(query.stringify({ "foo bar": "baz faz" }), "foo%20bar=baz%20faz");
	equal(query.stringify({ "foo bar": "baz'faz" }), "foo%20bar=baz%27faz");
	end();
});

tap.test("handle array value", ({ equal, same, end }) => {
	equal(
		query.stringify({
			abc: "abc",
			foo: ["bar", "baz"],
		}),
		"abc=abc&foo=bar&foo=baz"
	);
	end();
});

tap.test("handle empty array value", ({ equal, same, end }) => {
	equal(
		query.stringify({
			abc: "abc",
			foo: [],
		}),
		"abc=abc"
	);
	end();
});

tap.test("should not encode undefined values", ({ equal, same, end }) => {
	equal(
		query.stringify({
			abc: undefined,
			foo: "baz",
		}),
		"foo=baz"
	);
	end();
});

tap.test("should encode null values as just a key", ({ equal, same, end }) => {
	equal(
		query.stringify({
			abc: null,
			foo: "baz",
			"x y z": null,
		}),
		"abc&foo=baz&x%20y%20z"
	);
	end();
});

tap.test("handle null values in array", ({ equal, same, end }) => {
	equal(
		query.stringify({
			bar: [null, "baz"],
			foo: null,
		}),
		"bar&bar=baz&foo"
	);
	end();
});

tap.test("handle undefined values in array", ({ equal, same, end }) => {
	equal(
		query.stringify({
			bar: [undefined, "baz"],
			foo: null,
		}),
		"bar=baz&foo"
	);
	end();
});

tap.test(
	"handle undefined and null values in array",
	({ equal, same, end }) => {
		equal(
			query.stringify({
				bar: [undefined, null, "baz"],
				foo: null,
			}),
			"bar&bar=baz&foo"
		);
		end();
	}
);

tap.test("strict encoding", ({ equal, same, end }) => {
	equal(query.stringify({ foo: "'bar'" }), "foo=%27bar%27");
	equal(
		query.stringify({ foo: ["'bar'", "!baz"] }),
		"foo=%27bar%27&foo=%21baz"
	);
	end();
});

tap.test("should not sort", ({ equal, same, end }) => {
	const object = {
		story: "a",
		patch: "b",
		deployment: "c",
		lat: 10,
		lng: 20,
		sb: "d",
		sc: "e",
		mn: "f",
		ln: "g",
		nf: "h",
		srs: "i",
		destination: "g",
	};
	equal(
		query.stringify(object),
		"story=a&patch=b&deployment=c&lat=10&lng=20&sb=d&sc=e&mn=f&ln=g&nf=h&srs=i&destination=g"
	);
	end();
});
