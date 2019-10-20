import pkg from "../package.json";
import initialize from "./initialize.js";

export default {
	handle: "nore/http-sessions",

	package: pkg.name,
	version: pkg.version,

	name: "Nore HTTP sessions",
	description: "HTTP cookie	 based sessions",
	documentation: "https://navaru.com/nore/docs/http",

	author: {
		name: "Navaru",
		email: "office@navaru.com",
		url: "https://navaru.com",
	},

	dependencies: {
		"nore/http": "*",
		"nore/sqlite": "*",
	},

	// plugin defaults
	settings: {
		autoclean: true,
		autocleanInterval: 1000 * 60 * 60 * 24, // every 24 hours

		secret: "NOT__SO__SECRET__TOKEN__FOR__COOKIE__SIGNING",
		cookieName: "HSCN",

		// 1sec -> 1min -> 60min -> 24h => 1 week
		maxAge: 1000 * 60 * 60 * 24 * 7,

		cookie: {
			path: "/",
			domain: undefined,
			expires: undefined,
			secure: IS_PRODUCTION,
			httpOnly: true,
			sameSite: true,
		},
	},

	initialize,
};
