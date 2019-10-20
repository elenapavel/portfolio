import tap from "tape";
import parse from "./parse.js";

const tests = [
	{
		name: "arg with no arguments",
		itThrows: true,
	},
	{
		name: "basic parses arguments from process.argv",
		argv: ["node", "test.js", "--foo", "1337", "-B", "hello", "--mcgee"],
		settings: {
			"--foo": Number,
			"--bar": String,
			"--mcgee": Boolean,
			"-B": "--bar",
		},
		result: {
			_: ["node", "test.js"],
			"--foo": 1337,
			"--bar": "hello",
			"--mcgee": true,
		},
	},
	{
		name: "basic extra arguments parsing",
		argv: ["hi", "hello", "there", "-"],
		settings: {},
		result: { _: ["hi", "hello", "there", "-"] },
	},
	{
		name: "basic string parsing",
		argv: ["hey", "--foo", "hi", "hello"],
		settings: { "--foo": String },
		result: {
			_: ["hey", "hello"],
			"--foo": "hi",
		},
	},
	{
		name: "basic string parsing (equals long-arg)",
		argv: ["hey", "--foo=hi", "hello"],
		settings: { "--foo": String },
		result: {
			_: ["hey", "hello"],
			"--foo": "hi",
		},
	},
	{
		name: "parsing (equals long-arg-with-equals)",
		argv: ["hey", "--foo=hi.hello?q=p", "hello"],
		settings: { "--foo": String },
		result: {
			_: ["hey", "hello"],
			"--foo": "hi.hello?q=p",
		},
	},
	{
		name: "basic number parsing",
		argv: ["hey", "--foo", "1234", "hello"],
		settings: { "--foo": Number },
		result: {
			_: ["hey", "hello"],
			"--foo": 1234,
		},
	},
	{
		name: "basic boolean parsing",
		argv: ["hey", "--foo", "1234", "hello"],
		settings: { "--foo": Boolean },
		result: {
			_: ["hey", "1234", "hello"],
			"--foo": true,
		},
	},
	{
		name: "basic custom type parsing",
		argv: ["hey", "--foo", "1234", "hello"],
		settings: { "--foo": (val, name) => `:${name}:${val}:` },
		result: {
			_: ["hey", "hello"],
			"--foo": ":--foo:1234:",
		},
	},
	{
		name: "basic string parsing (array)",
		argv: ["hey", "--foo", "hi", "hello", "--foo", "hey"],
		settings: { "--foo": [String] },
		result: {
			_: ["hey", "hello"],
			"--foo": ["hi", "hey"],
		},
	},

	{
		name: "basic number parsing (array)",
		argv: ["hey", "--foo", "1234", "hello", "--foo", "5432"],
		settings: { "--foo": [Number] },
		result: {
			_: ["hey", "hello"],
			"--foo": [1234, 5432],
		},
	},

	{
		name: "basic boolean parsing (array)",
		argv: ["hey", "--foo", "1234", "hello", "--foo", "hallo"],
		settings: { "--foo": [Boolean] },
		result: {
			_: ["hey", "1234", "hello", "hallo"],
			"--foo": [true, true],
		},
	},

	{
		name: "basic custom type parsing (array)",
		argv: ["hey", "--foo", "1234", "hello", "--foo", "8911hi"],
		settings: { "--foo": [(val, name) => `:${name}:${val}:`] },
		result: {
			_: ["hey", "hello"],
			"--foo": [":--foo:1234:", ":--foo:8911hi:"],
		},
	},

	{
		name: "basic alias parsing",
		argv: ["--foo", "1234", "-B", "-", "hello", "--not-foo-or-bar", "ohai"],
		settings: {
			"--foo": Number,
			"--bar": String,
			"--another-arg": Boolean,
			"-a": "--another-arg",
			"--not-foo-or-bar": "--another-arg",
			"-B": "--bar",
		},
		result: {
			_: ["hello", "ohai"],
			"--foo": 1234,
			"--bar": "-",
			"--another-arg": true,
		},
	},

	{
		name: "double-dash parsing",
		argv: [
			"--foo",
			"1234",
			"hi",
			"--foo",
			"5678",
			"there",
			"--",
			"--foo",
			"2468",
		],
		settings: { "--foo": Number },
		result: {
			_: ["hi", "there", "--foo", "2468"],
			"--foo": 5678,
		},
	},

	{
		name: "error: invalid option",
		argv: ["--foo", "1234", "--bar", "8765"],
		settings: { "--foo": Number },
		itThrows: true,
	},

	{
		name: "error: expected argument",
		argv: ["--foo", "--bar", "1234"],
		settings: { "--foo": String, "--bar": Number },
		itThrows: true,
	},

	{
		name: "error: expected argument (end flag)",
		argv: ["--foo", "--bar"],
		settings: { "--foo": Boolean, "--bar": Number },
		itThrows: true,
	},

	{
		name: "error: expected argument (alias)",
		argv: ["--foo", "--bar", "1234"],
		settings: { "--realfoo": String, "--foo": "--realfoo", "--bar": Number },
		itThrows: true,
	},

	{
		name: "error: expected argument (end flag) (alias)",
		argv: ["--foo", "--bar"],
		settings: { "--foo": Boolean, "--realbar": Number, "--bar": "--realbar" },
		itThrows: true,
	},
	{
		name: "error: no singular - keys allowed",
		argv: ["--foo", "--bar", "1234"],
		settings: { "-": Boolean, "--bar": Number },
		itThrows: true,
	},

	{
		name: "error: no multi character short arguments",
		argv: ["--foo", "--bar", "1234"],
		settings: { "-abc": Boolean, "--bar": Number },
		itThrows: true,
	},

	{
		name: "ensure that all argument properties start with a hyphen",
		settings: {
			"--foo": Number,
			bar: String,
			"--baz": Boolean,
		},
		itThrows: true,
	},

	{
		name: "ensure argument property is not an empty string",
		settings: { "": Number },
		itThrows: true,
	},
];

for (const test of tests) {
	tap.test(test.name, ({ end, same, throws }) => {
		if (test.itThrows) {
			throws(() => parse(test.argv, test.settings));
		} else {
			same(parse(test.argv, test.settings), test.result);
		}
		end();
	});
}
