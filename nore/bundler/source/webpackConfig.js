import CaseSensitivePaths from "case-sensitive-paths-webpack-plugin";
import WebpackNiceLog from "webpack-nicelog";
import webpack from "webpack";
import merge from "webpack-merge";
import setWebWebpackConfig from "./web/webpackConfig.js";
import setNodeWebpackConfig from "./node/webpackConfig.js";
import extendWebpackConfig from "./extendWebpackConfig.js";

const { DefinePlugin } = webpack;

export default async bundle => {
	const config = {
		name: bundle.handle,
		context: bundle.sourcePath,
		// the environment in which the bundle will run
		// changes chunk loading behavior and available modules
		target: bundle.target,
		// tells webpack to use its built-in optimizations
		mode: bundle.isDevelopment ? "development" : "production",
		// how source maps are generated
		devtool: bundle.isDevelopment
			? "cheap-module-eval-source-map"
			: "source-map",
		// profiling
		cache: bundle.isDevelopment,
		profile: bundle.isDebug,
		externals: [],
	};

	config.resolve = {
		mainFields: ["source", "module", "main", "style"],
		mainFiles: ["index", "main"],
		modules: [bundle.sourcePath, `${bundle.path}/node_modules`],
		alias: {
			cwd: bundle.path,
			assets: `${bundle.path}/assets`,
			"~": bundle.sourcePath,
		},
	};

	config.resolveLoader = {
		modules: [`${bundle.path}/node_modules`],
	};

	config.module = {
		// makes missing exports an error instead of warning
		strictExportPresence: true,
	};

	config.optimization = {
		nodeEnv: process.env.NODE_ENV,
	};

	// turn off webpack output for performance hints
	config.performance = {
		maxAssetSize: 2e5, // 200kb
		maxEntrypointSize: 2e5, // 200kb
		hints: bundle.isProduction && "warning",
		assetFilter: str => !/\.map|mp4|ogg|mov|webm$/.test(str),
	};

	config.plugins = [
		new DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(
				bundle.isDevelopment ? "development" : "production"
			),
		}),
		new CaseSensitivePaths(),
		// Show compilation progress bar.
		new WebpackNiceLog({
			name: bundle.isForWeb ? "Web" : "Server",
			skipBuildTime: bundle.isProduction,
			color: "yellow",
		}),
	];

	if (bundle.isForWeb) {
		setWebWebpackConfig(bundle, config);
	}

	if (bundle.isForNode) {
		setNodeWebpackConfig(bundle, config);
	}

	// extends the webpack config by setting
	// properties on the bundle's config
	extendWebpackConfig(bundle, config);

	return config;
};
