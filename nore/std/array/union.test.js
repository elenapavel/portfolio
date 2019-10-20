import tap from "tape";
import union from "./union.js";

tap.test("union all elements in the given arrays", ({ end, same }) => {
	same(
		union(["a"], ["b", "c"], ["d", "e", "f"]),
		["a", "b", "c", "d", "e", "f"].sort()
	);

	same(
		union(["a", "b", "c"], ["b", "c"], ["a"], ["b", "c"], ["d", "e", "f"]),
		["a", "b", "c", "d", "e", "f"].sort()
	);

	end();
});

tap.test("ignore falsey values", ({ end, same }) => {
	same(union(["a"], undefined, ["d", "e", "f"]), ["a", "d", "e", "f"].sort());

	end();
});
