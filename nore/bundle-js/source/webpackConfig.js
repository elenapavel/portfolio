import TerserPlugin from "terser-webpack-plugin";
import LoadableWebpack from "@loadable/webpack-plugin";
import { merge } from "@nore/std/object";
import babel from "./babel.js";

const __dirname = import.meta.url.slice(7, import.meta.url.lastIndexOf("/"));

export default async bundle => {
	const optimization = {};
	const plugins = [];

	if (bundle.isForNode) {
		optimization.minimize = false;

		plugins.push(new LoadableWebpack());
	}

	if (bundle.isForWeb && bundle.isProduction) {
		// use terser to minimize JS code
		optimization.minimize = true;

		optimization.minimizer = [
			new TerserPlugin({
				cache: `${bundle.cachePath}/terser`,
				sourceMap: false,
				parallel: true,
				terserOptions: {
					ecma: 8,
					compress: {
						ecma: 5,
						warnings: false,
						comparisons: false,
					},
					output: {
						ecma: 5,
						comments: false,
						// turned on because emoji and regex is not minified properly
						ascii_only: true,
					},
				},
			}),
		];
	}

	const oneOf = [
		{
			test: /\.eval\.js$/,
			enforce: "pre",
			use: {
				loader: `${__dirname}/evalLoader.cjs`,
				options: { bundle: JSON.parse(JSON.stringify(bundle)) },
			},
		},
		{
			use: {
				loader: "babel-loader",
				options: await babel(bundle),
			},
		},
	];

	const extensions = [".js", ".jsx", ".json"];

	return {
		plugins,
		optimization,
		module: {
			rules: [{ test: /\.jsx?$/, exclude: [/node_modules/], oneOf }],
		},
		resolve: { extensions },
	};
};
