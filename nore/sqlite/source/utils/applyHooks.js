export default async (hooks, records) => {
	// no hooks to run
	if (hooks.length === 0) return;

	// record is null
	if (!records) return;

	const isArray = Array.isArray(records);

	// records is an empty array
	if (isArray && !records.length) return;

	// records is an object, transform in an array
	if (!isArray) records = [records];

	for (const handler of hooks) {
		await handler(records);
	}
};
