import { log, on, plugin, use } from "@nore/cms";

on("ready", async () => {
	const http = await plugin("nore/http");
	const $typeform = await use("github-portfolio/typeform");

	http.route({
		path: "/api/typeform/forms",
		method: "GET",
		allow: ["admins"],
		async handler(request, reply) {
			const { id } = request.query;

			if (id) {
				return await $typeform.form(id);
			}

			return await $typeform.forms();
		},
	});
});
