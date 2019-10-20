import CSSExtract from "extract-css-chunks-webpack-plugin";
import getLocalIdent from "./getLocalIdent.js";
import getPostcssOptions from "./postcss";

const __dirname = import.meta.url.slice(7, import.meta.url.lastIndexOf("/"));

export default async function getCSSLoaders({ bundle, useModules }) {
	const modules = { context: bundle.sourcePath };

	if (bundle.isDevelopment) {
		modules.getLocalIdent = getLocalIdent;
	} else {
		modules.localIdentName = "[hash:base64:6]";
	}

	const cssLoader = {
		loader: "css-loader",
		options: {
			importLoaders: 2,
			localsConvention: "dashesOnly",
			sourceMap: bundle.isDevelopment,
			modules: useModules ? modules : false,
			onlyLocals: bundle.isForNode,
		},
	};

	const resolveUrlLoader = {
		loader: "resolve-url-loader",
		options: { root: bundle.sourcePath },
	};

	const postcssLoader = {
		loader: "postcss-loader",
		options: await getPostcssOptions(bundle),
	};

	// loaders for: "path/to/css?raw"
	const loaders = [cssLoader, resolveUrlLoader, postcssLoader];

	if (bundle.isForWeb) {
		loaders.unshift({
			loader: CSSExtract.loader,
			options: {
				hot: true,
				reloadAll: true,
				filename: "[name].[contenthash].css",
				chunkFilename: "[name].[contenthash].css",
			},
		});
	}

	if (useModules) {
		// inject the CSS classes helper
		loaders.unshift(`${__dirname}/classesLoader.cjs`);
	}

	return loaders;
}
