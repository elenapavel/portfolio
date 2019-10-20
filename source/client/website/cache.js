const _10min = 1000 * 60 * 10;

export default {
	set(key, data, timeout = _10min) {
		localStorage.setItem(
			`__page:${key}__`,
			JSON.stringify({ data, expiresAt: Date.now() + timeout })
		);
	},

	get(key) {
		const item = localStorage.getItem(`__page:${key}__`);

		// no entry
		if (!item) return null;

		const entry = JSON.parse(item);

		// entry expired
		if (entry.expiresAt < Date.now()) {
			localStorage.removeItem(key);

			return null;
		}

		return entry.data;
	},
};
