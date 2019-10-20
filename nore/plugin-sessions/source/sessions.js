import { sign, unsign } from "cookie-signature";
import crypto from "crypto";

export default ({ store }) => async (fastify, options) => {
	const sid = () => crypto.randomBytes(20).toString("hex");

	fastify.addHook("preHandler", async (request, reply) => {
		// start from a fresh session object
		request.sessionId = sid();
		request.session = {};

		// get previous session cookie
		const signedId = request.cookies[options.cookieName];

		if (signedId) {
			// decrypt cookie to get session ID
			const sessionId = unsign(signedId, options.secret);

			if (sessionId) {
				// set previous session ID
				request.sessionId = sessionId;

				// check if a previous session was stored
				const session = await store.get(sessionId);

				if (session) {
					request.session = session;
				}
			}
		}
	});

	fastify.addHook("onSend", async (request, reply, payload) => {
		// an error occurred, ignore session reset
		if (!request.sessionId) return;

		// remove old stored session
		await store.remove(request.sessionId);

		// session was destroyed
		if (request.session === null) return;

		// save session under new id so no reply attack can be preformed
		const sessionId = sid();
		const signedId = sign(sessionId, options.secret);
		const expires = Date.now() + options.maxAge;
		const secure =
			options.cookie.secure || request.headers["x-forwarded-proto"] === "https";

		reply.setCookie(options.cookieName, signedId, {
			...options.cookie,
			expires,
			secure,
		});

		await store.set(sessionId, request.session, expires);
	});
};
