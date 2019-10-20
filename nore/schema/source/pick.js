export default function pick(schema, fields) {
	const result = { type: "object", properties: {}, required: [] };

	for (const name of fields) {
		if (schema.properties[name]) {
			result.properties[name] = schema.properties[name];

			if (schema.required && schema.required.includes(name)) {
				result.required.push(name);
			}
		}
	}

	return result;
}
