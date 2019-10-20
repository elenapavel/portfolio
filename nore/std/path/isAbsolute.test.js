import tap from "tape";
import isAbsolute from "./isAbsolute.js";

tap.test("isAbsolute", ({ equal, end }) => {
	const cases = {
		"/path": true,
		"/": true,
		" /path": false,
		"./path": false,
		"../path": false,
		path: false,
	};

	for (let key in cases) {
		equal(isAbsolute(key), cases[key]);
	}

	end();
});
