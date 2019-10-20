import tap from "tape";
import isRelative from "./isRelative.js";

tap.test("isRelative", ({ equal, end }) => {
	const cases = {
		"./": true,
		"../": true,
		"./path": true,
		"../path": true,
		"..": true,
		" ./": false,
		"/path": false,
		"path/to": false,
	};

	for (let key in cases) {
		equal(isRelative(key), cases[key]);
	}

	end();
});
