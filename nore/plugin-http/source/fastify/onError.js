import { log } from "@nore/cms";

export default async function onError(error, request, reply) {
	log.error(error);

	// normalize HTTPError response
	if (error.name === "HTTPError") {
		reply.type("application/json");
		reply.code(error.code);

		return error.body;
	}

	// TODO: fix error formatting
	if (error.name === "SqliteError") {
		reply.type("application/json");
		reply.code(400);

		return error;
		// return fmtSQLiteErrors(error);
	}

	// JSON schema validation error
	if (error.validation) {
		reply.type("application/json");
		reply.code(400);

		return error;
		// return fmtJSONSchemaErrors(error.validation);
	}

	// handle edge cases where a plugin misbehaves
	if (reply.res.statusCode < 400) {
		reply.code(500);

		return {
			statusCode: 500,
			message: "Internal server error",
			data: "Unknown error source",
		};
	}

	return error;
}
