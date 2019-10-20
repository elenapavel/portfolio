import { log, on, plugin, use } from "@nore/cms";
import errorMessage from "~/server/errors";

on("ready", async () => {
	const http = await plugin("nore/http");
	const $enroll = await use("github-portfolio/enroll");

	http.route({
		path: "/api/enroll",
		method: "POST",
		// allow: ["admins"],
		async handler(request, reply) {
			const data = request.body;
			const result = await $enroll.create(data);

			return reply.success({ id: result.id });
		},
	});
});
