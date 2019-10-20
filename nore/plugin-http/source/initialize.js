import { log, on, define } from "@nore/cms";
import fastify from "./fastify";

define("nore/http::register", ({ plugin, options }) => {
	fastify.register(fastify.plugin(plugin), options);
});

export default async settings => {
	on("final", async () => {
		// wait for all plugins to load
		await fastify.ready();

		// start listen for HTTP requests
		fastify.listen(settings.port);
	});

	// TODO: add hooks for http error handler and fastify plugin register
	return fastify;
};
