export default {
	async before(records) {
		for (const record of records) {
			if (record.data) {
				record.data = JSON.stringify(record.data);
			}

			record.updatedAt = Date.now();
		}
	},

	async after(records) {
		for (const record of records) {
			if (record.data) {
				record.data = JSON.parse(record.data);
			}
		}
	},
};
