export default async bundle => {
	const rules = [
		{
			test: /\.(ttf|eot)$/,
			use: {
				loader: "file-loader",
				options: {
					name: "fonts/[name].[ext]",
				},
			},
		},
		{
			// match woff2 in addition to patterns like .woff?v=1.1.1.
			test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
			use: {
				loader: "url-loader",
				options: {
					fallback: "file-loader",
					mimetype: "application/font-woff",

					// Limit at 50k. Above that it emits separate files
					limit: 50000,

					// output fonts path
					name: "fonts/[name].[ext]",
				},
			},
		},
	];

	return {
		module: { rules },
	};
};
