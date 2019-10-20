import JSONSchema from "@nore/schema";

const states = ["draft", "published", "unpublished"];

export default JSONSchema({
	type: "object",
	properties: {
		id: { type: "string" },

		name: { type: "string" },
		path: { type: "string" },
		layout: { type: "string" },

		title: { type: "string" },
		description: { type: "string" },
		data: { type: "string" },

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
	table: "pages",
	primaryKeys: ["id"],
	unique: ["id", "path"],
	required: ["title", "state", "createdBy", "createdAt"],
});
