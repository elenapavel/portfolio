import CSSExtract from "extract-css-chunks-webpack-plugin";

export default async ({ bundle }) => {
	const cssLoader = {
		loader: "css-loader",
		options: {
			localsConvention: "dashesOnly",
			sourceMap: bundle.isDevelopment,
		},
	};

	const sassLoader = { loader: "sass-loader" };

	const resolveUrlLoader = {
		loader: "resolve-url-loader",
		options: { root: bundle.sourcePath },
	};

	const loaders = [cssLoader, resolveUrlLoader, sassLoader];

	if (bundle.isForWeb) {
		loaders.unshift(CSSExtract.loader);
	}

	return loaders;
};
