import tap from "tape";
import { isPromise } from "./index.js";

tap.test("isPromise", ({ equal, end }) => {
	equal(isPromise(true), false, "true");
	equal(isPromise(false), false, "false");

	equal(isPromise(null), false, "null");
	equal(isPromise(undefined), false, "undefined");
	equal(isPromise(void 0), false, "void 0");

	equal(isPromise(0), false, "0");
	equal(isPromise(1), false, "1");
	equal(isPromise(1.0), false, "1.0");
	equal(isPromise(NaN), false, "NaN");
	equal(isPromise(Infinity), false, "Infinity");

	equal(isPromise("sample"), false, "string");
	equal(isPromise(""), false, "empty string");

	equal(isPromise({}), false, "{}");
	equal(isPromise([]), false, "[]");
	equal(isPromise(function() {}), false, "function () {}");
	equal(isPromise(function*() {}), false, "function * () {}");
	equal(isPromise(() => {}), false, "() => {}");

	equal(isPromise(new Date()), false, "new Date()");
	equal(isPromise(new Error("sample")), false, "new Error()");
	equal(isPromise(/sample/g), false, "/sample/g");
	equal(isPromise(Symbol("foo")), false, "Symbol('foo')");

	equal(isPromise(new Promise(resolve => resolve())), true, "new Promise()");
	equal(isPromise(Promise.resolve(true)), true, "Promise.resolve()");

	end();
});
