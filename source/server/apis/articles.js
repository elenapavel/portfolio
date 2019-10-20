import { log, on, plugin, use } from "@nore/cms";

on("ready", async () => {
	const http = await plugin("nore/http");
	const $articles = await use("github-portfolio/articles");

	http.route({
		path: "/api/articles",
		method: "GET",
		allow: ["admins"],
		async handler(request, reply) {
			const { query = {}, filters = {} } = request.query;
			const { records, total } = await $articles.findAndCount(
				query,
				filters
			);

			return { total, data: records };
		},
	});
});
