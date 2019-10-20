import tap from "tape";
import omit from "./omit.js";

tap.test("omit returns new object", ({ ok, same, end }) => {
	var obj = { a: 3, b: 5, c: 9 };
	ok(omit(obj, []) !== obj);
	end();
});

tap.test("omit using array", ({ ok, same, end }) => {
	var obj = { a: 3, b: 5, c: 9 };
	same(omit(obj, ["a", "c"]), { b: 5 });
	end();
});

tap.test("omit using a non-existent key", ({ ok, same, end }) => {
	var obj = { a: 3, b: 5, c: 9 };
	same(omit(obj, ["a", "b", "d"]), { c: 9 });
	end();
});

tap.test("omit using a duplicate key", ({ ok, same, end }) => {
	var obj = { a: 3, b: 5, c: 9 };
	same(omit(obj, ["a", "a"]), { b: 5, c: 9 });
	end();
});

tap.test("omit where obj has a function value", ({ ok, same, end }) => {
	var fn = ({ plan, ok, end }) => {
		return true;
	};
	var obj = { a: 3, b: fn };
	same(omit(obj, ["a"]), { b: fn });
	end();
});
