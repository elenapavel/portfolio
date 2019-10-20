import AJV from "ajv";

export function schemaAllErrors(route) {
	// validates all fiels on the schema, doesn't stop at first error
	if (route.schema && route.schema.allErrors) {
		const validator = new AJV({
			removeAdditional: true,
			useDefaults: true,
			coerceTypes: true,
			allErrors: true,
		});

		route.schemaCompiler = schema => validator.compile(schema);
	}
}
