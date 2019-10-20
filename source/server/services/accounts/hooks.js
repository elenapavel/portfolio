import crypto from "./crypto.js";

export default {
	async before(records) {
		for (const record of records) {
			if (record.password) {
				// hash password for security
				record.password = await crypto.hash(record.password);
			}

			if (record.groups) {
				record.groups = record.groups.join(",");
			}

			record.updatedAt = Date.now();
		}
	},

	async after(records) {
		for (const record of records) {
			if (record.groups) {
				record.groups = record.groups.split(",");
			}
		}
	},
};
