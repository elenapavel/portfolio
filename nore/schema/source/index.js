import JSONSchemaError from "./JSONSchemaError";
import toSQL from "./toSQL.js";
import pick from "./pick.js";
import ajv from "./ajv.js";

// export schema helper
export default function JSONSchema(schema) {
	const validate = ajv.compile(schema);

	function validateOrThrow(data) {
		const isValid = validate(data);

		if (!isValid) {
			throw new JSONSchemaError(
				"JSON Schema validation error",
				validate.errors
			);
		}
	}

	return Object.defineProperties(schema, {
		pick: { enumerable: false, value: keys => pick(schema, keys) },
		toSQL: { enumerable: false, value: () => toSQL(schema) },
		validateOrThrow: { enumerable: false, value: validateOrThrow },
		validate: { enumerable: false, value: validate },
	});
}
