import JSONSchema from "@nore/schema";

export default JSONSchema({
	type: "object",
	properties: {
		id: { type: "string" },

		name: { type: "string" },
		phone: { type: "string" },
		event: { type: "string" },

		createdAt: { type: "number" },
	},
	table: "enroll",
	primaryKeys: ["id"],
	unique: ["id"],
	required: ["name", "phone", "event", "createdAt"],
});
