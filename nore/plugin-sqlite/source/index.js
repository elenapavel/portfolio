import initialize from "./initialize.js";

export default {
	handle: "nore/sqlite",
	version: "1.0.0",

	name: "Nore HTTP",
	description: "Nore SQLite interface",
	website: "https://github.com/nore/plugin-sqlite",
	documentation: "https://navaru.com/nore/docs/sqlite",

	author: {
		name: "Navaru",
		email: "office@navaru.com",
		url: "https://navaru.com",
	},

	initialize,
};
