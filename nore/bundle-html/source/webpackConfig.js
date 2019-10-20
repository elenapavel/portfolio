import HTMLPlugin from "html-webpack-plugin";
import InlineWebpackRuntime from "./InlineWebpackRuntime.js";

const __dirname = import.meta.url.slice(7, import.meta.url.lastIndexOf("/"));

const minifyOptions = {
	removeComments: true,
	collapseWhitespace: true,
	removeRedundantAttributes: true,
	useShortDoctype: true,
	removeEmptyAttributes: true,
	removeStyleLinkTypeAttributes: true,
	keepClosingSlash: true,
	minifyJS: true,
	minifyCSS: true,
	minifyURLs: true,
};

export default async bundle => {
	const plugins = [];

	if (bundle.isForWeb) {
		plugins.push(
			new HTMLPlugin({
				bundle,
				template: `${__dirname}/template.js`,
				inject: false,
				minify: bundle.isDevelopment ? false : minifyOptions,
			}),
			// webpack's runtime always change between every build it's
			// better to split the runtime code out for long-term caching
			new InlineWebpackRuntime("webpack_runtime")
		);
	}

	const htmlLoader = ({ useTemplate }) => ({
		loader: "html-loader",
		options: {
			minimize: bundle.isProduction,
			template: useTemplate,
		},
	});

	const rule = {
		test: /\.html$/,
		oneOf: [
			{
				resourceQuery: /raw/,
				use: htmlLoader({ useTemplate: false }),
			},
			{
				use: htmlLoader({ useTemplate: true }),
			},
		],
	};

	return {
		plugins,
		module: { rules: [rule] },
	};
};
