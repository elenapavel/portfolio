import { pick } from "@nore/std/object";

export default function fmtFormFields(fields, result = []) {
	for (const field of fields) {
		// handle field group
		if (field.properties && field.properties.fields) {
			const header = { ...pick(field, ["id", "title"]), isHeader: true };
			const fields = fmtFormFields(field.properties.fields).map(item => ({
				...item,
				group_id: field.id,
			}));

			result.push(header, ...fields);
		} else {
			result.push({
				id: field.id,
				title: field.title,
				description: field.properties ? field.properties.description : "",
			});
		}
	}

	return result;
}
