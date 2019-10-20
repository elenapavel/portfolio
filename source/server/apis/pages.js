import { log, on, plugin, use } from "@nore/cms";
import errorMessage from "~/server/errors";

on("ready", async () => {
	const http = await plugin("nore/http");
	const $pages = await use("github-portfolio/pages");

	http.route({
		path: "/api/pages",
		method: "GET",
		async handler(request, reply) {
			const query = request.query;
			const pages = await $pages.find({ ...query, state: "published" });

			if (!pages.length) {
				return reply.error(404, errorMessage.resource.noResults);
			}

			return { data: pages };
		},
	});

	http.route({
		path: "/api/pages/:id",
		method: "GET",
		async handler(request, reply) {
			const { id } = request.params;
			const page = await $pages.getById(id);

			if (!page) {
				return reply.error(404, errorMessage.resource.notFound);
			}

			return page;
		},
	});

	http.route({
		path: "/api/pages/:id",
		method: "POST",
		allow: ["admins"],
		async handler(request, reply) {
			const { id } = request.params;
			const data = request.body;
			const result = await $pages.update({ id }, data);

			if (!result.changes) {
				return reply.error(400, errorMessage.resource.noChanges);
			}

			return reply.success({ changes: result.changes });
		},
	});
});
