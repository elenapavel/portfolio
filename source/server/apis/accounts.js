import { log, on, plugin, use } from "@nore/cms";
import { pick, omit } from "@nore/std/object";

on("ready", async () => {
	const http = await plugin("nore/http");
	const $accounts = await use("github-portfolio/accounts");

	http.route({
		path: "/api/accounts",
		method: "GET",
		allow: ["admins"],
		async handler(request, reply) {
			const { query = {}, filters = {} } = request.query;
			const { records, total } = await $accounts.findAndCount(
				query,
				filters
			);

			// ignore password hashes
			const data = records.map(account => omit(account, ["password"]));

			return { total, data };
		},
	});

	http.route({
		path: "/api/accounts",
		method: "POST",
		allow: ["admins"],
		async handler(request, reply) {
			const data = request.body;
			const result = await $accounts.create(data);

			return reply.success(result);
		},
	});

	http.route({
		path: "/api/accounts",
		method: "PUT",
		allow: ["admins"],
		async handler(request, reply) {
			const query = request.query;
			const data = request.body;

			await $accounts.update(query, data);

			return reply.success();
		},
	});

	http.route({
		path: "/api/accounts/me",
		method: "GET",
		allow: ["members"],
		async handler(request, reply) {
			const fields = ["id", "email", "login", "name", "groups", "state"];

			return pick(request.account, fields);
		},
	});
});
