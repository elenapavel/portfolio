export default ({ table }) => ({
	async get(id) {
		const record = await table.findOne({ id });

		if (record && record.data) {
			return JSON.parse(record.data);
		}

		return null;
	},

	async set(id, data, expires) {
		data = JSON.stringify(data);
		expires = +new Date(+expires);

		const record = await table.findOne({ id });

		if (record) {
			record.data = data;
			record.expires = expires;

			await table.update({ id: record.id }, record);
		} else {
			await table.insert({ id, data, expires });
		}
	},

	async remove(id) {
		await table.delete({ id });
	},

	async cleanup() {
		await table.delete({ expires: { $lt: Date.now() } });
	},
});
