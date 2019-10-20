import tap from "tape";
import itExists from "./itExists.js";

const __dirname = import.meta.url.slice(7, import.meta.url.lastIndexOf("/"));

tap.test("itExists", async ({ ok, notOk, end }) => {
	ok(await itExists(`${__dirname}/itExists.js`));
	notOk(await itExists(`${__dirname}/itExists`));

	end();
});
