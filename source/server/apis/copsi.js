import { log, on, plugin, use } from "@nore/cms";
import errorMessage from "~/server/errors";

on("ready", async () => {
	const http = await plugin("nore/http");
	const $copsi = await use("github-portfolio/copsi");

	http.route({
		path: "/api/copsi",
		method: "GET",
		allow: ["admins"],
		async handler(request, reply) {
			const query = request.query;
			const records = await $copsi.find(query);

			if (!records.length) {
				return reply.error(404, errorMessage.resource.noResults);
			}

			return {
				data: records.map(record => ({
					...record.data,
					id: record.id,
				})),
			};
		},
	});

	http.route({
		path: "/api/copsi/:type",
		method: "POST",
		allow: ["admins"],
		async handler(request, reply) {
			const { type } = request.params;
			const { records } = request.body;
			const changes = [];

			for (const record of records) {
				// update
				if (record.id) {
					var change = await $copsi.update(
						{ id: record.id },
						{ data: record }
					);
				}
				// create
				else {
					var change = await $copsi.create({ type, data: record });
				}

				changes.push(change);
			}

			if (!changes.length) {
				return reply.error(400, errorMessage.resource.noChanges);
			}

			return reply.success({ changes });
		},
	});

	http.route({
		path: "/api/copsi/:id",
		method: "DELETE",
		allow: ["admins"],
		async handler(request, reply) {
			const { id } = request.params;
			const result = await $copsi.deleteById(id);

			if (!result.changes) {
				return reply.error(400, errorMessage.resource.noChanges);
			}

			return reply.success({ changes: result.changes });
		},
	});
});
