import tap from "tape";
import shuffle from "./shuffle.js";

tap.test("shuffle", ({ end, notSame }) => {
	const source = [1, 2, 3, 4, 5, 6];

	notSame(source, shuffle(source));
	notSame(source, shuffle(source));
	notSame(source, shuffle(source));
	notSame(shuffle(source), shuffle(source));

	end();
});
