const __dirname = import.meta.url.slice(7, import.meta.url.lastIndexOf("/"));

export default async bundle => {
	const rule = {
		test: /\.toml$/,
		use: `${__dirname}/loader.cjs`,
	};

	return {
		module: {
			rules: [rule],
		},
	};
};
