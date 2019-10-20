import JSONSchema from "@nore/schema";

const states = ["draft", "published", "archived"];

export default JSONSchema({
	type: "object",
	properties: {
		id: { type: "string" },

		title: { type: "string" },
		content: { type: "string" },

		state: {
			type: "string",
			enum: states,
			default: states[0],
		},

		createdBy: { type: "string" },
		updatedBy: { type: "string" },

		createdAt: { type: "number" },
		updatedAt: { type: "number" },
	},
	table: "articles",
	primaryKeys: ["id"],
	unique: ["id", "title"],
	required: ["title", "state", "createdBy", "createdAt"],
});
