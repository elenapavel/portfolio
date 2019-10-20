import { log, on, plugin } from "@nore/cms";

on("ready", async () => {
    const http = await plugin("nore/http");
    const squirrelly = await plugin("nore/squirrelly");

    http.route({
        path: "/*",
        method: "GET",

        async handler(request, reply) {
            const path = request.params["*"];

            if (!squirrelly.has(path)) return null;

            reply.header("Content-Type", "text/html; charset=utf-8");
            const $dd = squirrelly.render(path, {
                param: "Test",
                header: "Header",
            });

            return $dd;
        },
    });

    log.info("Portfolio.ro server ready");
});
