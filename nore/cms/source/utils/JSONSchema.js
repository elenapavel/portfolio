import AJV from "ajv";

const ajv = new AJV({
	coerceTypes: true,
	allErrors: true,
});

export default function JSONSchema(schema) {
	return ajv.compile(schema);
}
