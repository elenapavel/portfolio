import qs from "qs";
import Fastify from "fastify";
import cors from "fastify-cors";
import cookies from "fastify-cookie";
import multipart from "fastify-multipart";
import plugin from "fastify-plugin";
import * as helpers from "./helpers.js";
import * as hooks from "./hooks.js";
import onError from "./onError.js";
import settings from "./settings.js";

const fastify = Fastify({
	ignoreTrailingSlash: true,
	querystringParser: qs.parse,
	// logger: IS_DEVELOPMENT ? log : false,
});

fastify.setErrorHandler(onError);
fastify.register(cors, settings.cors);
fastify.register(cookies, settings.cookies);
fastify.register(multipart, settings.multipart);

fastify.decorateReply("success", helpers.replySuccess);
fastify.decorateReply("error", helpers.replyError);

fastify.addHook("onRoute", hooks.schemaAllErrors);
fastify.plugin = plugin;

export default fastify;
