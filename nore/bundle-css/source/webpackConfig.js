import CSSExtract from "extract-css-chunks-webpack-plugin";
import OptimizeCSSAssets from "optimize-css-assets-webpack-plugin";
import getCSSLoaders from "./getCSSLoaders.js";
import getSASSLoaders from "./getSASSLoaders.js";

export default async bundle => {
	const config = {
		plugins: [],
		module: {},
		resolve: {
			mainFields: ["style"],
			mainFiles: ["style"],
			extensions: [".css"],
		},
	};

	if (bundle.isForWeb) {
		config.plugins.push(
			new CSSExtract({
				cssModules: true,
				hot: bundle.isDevelopment,
				reloadAll: bundle.isDevelopment,
				orderWarning: bundle.isDevelopment,
				filename: bundle.isDevelopment ? "[name].css" : "[chunkhash:8].css",
			})
		);

		if (bundle.isProduction) {
			config.plugins.push(
				new OptimizeCSSAssets({
					cssProcessorOptions: {
						preset: [
							"default",
							{ discardComments: { removeAll: true }, calc: false },
						],
					},
				})
			);
		}
	}

	// allow to load CSS Modules: `import style from "./style.css"`
	const cssModulesLoaders = await getCSSLoaders({ bundle, useModules: true });

	// allow to load raw CSS: `import "./bootstrap.css?raw`
	const cssRawLoaders = await getCSSLoaders({ bundle, useModules: false });

	// allow to load SCSS / SASS: import "./bootstrap.scss"
	const sassLoaders = await getSASSLoaders({ bundle });

	config.module.rules = [
		{
			test: /\.css$/,
			oneOf: [
				{ use: cssRawLoaders, resourceQuery: /raw/ },
				{ use: cssModulesLoaders },
			],
		},
		{ test: /\.scss$/, use: sassLoaders },
	];

	return config;
};
