import { log, on, plugin, use } from "@nore/cms";
import { pick } from "@nore/std/object";
import errorMessage from "~/server/errors";

on("ready", async () => {
	const http = await plugin("nore/http");
	const $accounts = await use("github-portfolio/accounts");

	http.addHook("onRoute", async route => {
		if (route.allow && route.allow.length) {
			if (!route.preHandler) {
				route.preHandler = checkPermissions;
			} else if (Array.isArray(route.preHandler)) {
				route.preHandler.unshift(checkPermissions);
			} else {
				route.preHandler = [checkPermissions, route.preHandler];
			}
		}

		async function checkPermissions(request, reply) {
			const { accountId } = request.session;

			// no session
			if (!accountId) {
				throw reply.error(403, errorMessage.auth.notLoggedIn);
			}

			const account = await $accounts.getById(accountId);

			// no account
			if (!account) {
				// destroy related session
				request.session = null;

				throw reply.error(403, {
					message: errorMessage.auth.noSession,
				});
			}

			const isAllowed = route.allow.some(group =>
				account.groups.includes(group)
			);

			if (!isAllowed) {
				throw reply.error(403, errorMessage.auth.noPermission);
			}

			request.account = account;
			request.isAdmin = account.groups.includes("admins");
		}
	});

	http.route({
		path: "/api/auth/register",
		method: "POST",
		schema: {
			allErrors: true,
			body: $accounts.schema.pick(["email", "password"]),
		},
		async handler(request, reply) {
			const data = request.body;
			const account = await $accounts.add(data);

			// set account ID on session for signin
			request.session.accountId = account.id;

			return { id: account.id };
		},
	});

	http.route({
		path: "/api/auth/signin",
		method: "POST",
		schema: {
			allErrors: true,
			body: $accounts.schema.pick(["login", "password"]),
		},
		async handler(request, reply) {
			const data = request.body;
			const account = await $accounts.getByLogin(data.login);

			if (!account) {
				throw reply.error(400, errorMessage.auth.invalidLogin);
			}

			const isPasswordValid = await $accounts.verifyPassword(
				data.password,
				account.password
			);

			if (!isPasswordValid) {
				throw reply.error(400, errorMessage.auth.invalidLogin);
			}

			// set account id on session to authorize further requests
			request.session.accountId = account.id;

			return { success: true };
		},
	});

	http.route({
		path: "/api/auth/signout",
		method: "POST",
		async handler(request, reply) {
			request.session = null;

			return { success: true };
		},
	});

	http.route({
		path: "/api/auth/signout",
		method: "GET",
		async handler(request, reply) {
			request.session = null;

			reply.redirect("/signin");
		},
	});
});
