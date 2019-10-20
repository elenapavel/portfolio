import JSONSchema from "@nore/schema";

const groups = ["members", "clients", "buyers", "admins"];
const states = ["pending", "active", "suspended", "locked", "archived"];

export default JSONSchema({
	type: "object",
	properties: {
		id: { type: "string" },

		email: { type: "string" },
		login: { type: "string" },
		password: { type: "string" },
		name: { type: "string" },

		groups: {
			type: "array",
			items: { type: "string", enum: groups },
			default: groups[0],
		},

		state: {
			type: "string",
			enum: states,
			default: states[1],
		},

		createdAt: { type: "number" },
		updatedAt: { type: "number" },
	},
	table: "accounts",
	primaryKeys: ["id"],
	unique: ["id", "email"],
	required: ["email", "password"],
});
