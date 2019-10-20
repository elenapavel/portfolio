import JSONSchema from "../utils/JSONSchema.js";

export default JSONSchema({
	type: "object",
	properties: {
		handle: { type: "string" },
		version: { type: "string" },

		name: { type: "string" },
		description: { type: "string" },

		website: { type: "string" },
		documentation: { type: "string" },

		author: {
			type: "object",
			properties: {
				name: { type: "string" },
				email: { type: "string" },
				url: { type: "string" },
			},
		},

		protected: { type: "boolean" },

		dependencies: { type: "object" },
		permission: { type: "object" },
		settings: { type: "object" },
	},
	unique: ["handle"],
	required: ["handle", "version", "name", "description", "author"],
});
