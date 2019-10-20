import JSONSchema from "@nore/schema";

export default JSONSchema({
	type: "object",
	properties: {
		id: { type: "string" },

		// register type
		type: { type: "string" },
		// the register record in JSON format
		data: { type: "object" },

		createdAt: { type: "number" },
		updatedAt: { type: "number" },
	},
	table: "copsi",
	primaryKeys: ["id"],
	unique: ["id"],
	required: ["type", "data"],
});
