import tap from "tape";
import loadConfig from "../source/utils/loadConfig";

const __dirname = import.meta.url.slice(7, import.meta.url.lastIndexOf("/"));
const samples = __dirname + "/samples";

tap.test("loadConfig - [handle].[mode].js", async ({ end, equal, same }) => {
	const options = {
		path: samples,
		mode: "development",
		handle: "client",
	};
	const configs = await loadConfig(options);
	const expected = {
		target: "web",
		browserslist: "last 1 version",
		...options,
	};

	same(configs, expected);
	end();
});

tap.test("loadConfig - [handle].js", async ({ end, equal, same }) => {
	const options = {
		path: samples,
		mode: "production",
		handle: "client",
	};
	const configs = await loadConfig(options);
	const expected = {
		target: "web",
		browserslist: "last 1 version",
		config: {
			url: "production.com",
			port: 2000,
		},
		...options,
	};

	same(configs, expected);
	end();
});

tap.test("loadConfig - [handle].toml", async ({ end, equal, same }) => {
	const options = {
		path: samples,
		mode: "development",
		handle: "mysite",
	};
	const configs = await loadConfig(options);

	const expected = {
		target: "web",
		template: "index.html",
		config: {
			url: "development.com",
			port: 3000,
		},
		...options,
	};

	same(configs, expected);
	end();
});

tap.test("loadConfig - [handle].yaml", async ({ end, equal, same }) => {
	const options = {
		path: samples,
		mode: "production",
		handle: "pwa",
	};
	const configs = await loadConfig(options);
	const expected = {
		target: "web",
		template: "index.html",
		config: {
			url: "production.com",
			port: 2000,
		},
		...options,
	};

	same(configs, expected);
	end();
});
