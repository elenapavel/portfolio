export default class JSONSchemaError extends Error {
	constructor(message, data) {
		super();

		this.name = "JSONSchemaError";
		this.message = message;
		this.data = data;

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, JSONSchemaError);
		}
	}
}
