import pkg from "../package.json";
import initialize from "./initialize.js";

export default {
	handle: "nore/http",

	package: pkg.name,
	version: pkg.version,

	name: "Nore HTTP",
	description: "Nore HTTP server",
	documentation: "https://navaru.com/nore/docs/http",

	author: {
		name: "Navaru",
		email: "office@navaru.com",
		url: "https://navaru.com",
	},

	permissions: {},

	settings: {
		port: 5000,
	},

	initialize,
};
