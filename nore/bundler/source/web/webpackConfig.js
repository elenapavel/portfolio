import WPS from "webpack-plugin-serve";

const __dirname = import.meta.url.slice(7, import.meta.url.lastIndexOf("/"));

export default (bundle, config) => {
	config.entry = [bundle.config.entry || bundle.config.handle];

	config.output = {
		path: bundle.outputPath,
		publicPath: bundle.config.url.path,
		filename: bundle.isDevelopment ? "[name].[hash:4].js" : "[chunkhash:8].js",
	};

	// prevent webpack from injecting mocks to Node native modules
	// that does not make sense for the client
	config.node = {
		dgram: "empty",
		fs: "empty",
		net: "empty",
		tls: "empty",
		child_process: "empty",
		// prevent webpack from injecting a useless setImmediate polyfill
		setImmediate: false,
	};

	// resolve imports using the "browser" field from package.json
	config.resolve.mainFields.unshift("browser");

	config.optimization.runtimeChunk = {
		name: "webpack_runtime",
	};

	if (bundle.isProduction) {
		// inject custom node globals to source
		config.entry.unshift(`${__dirname}/polyfills.js`);
	}

	if (bundle.isDevelopment) {
		config.optimization.splitChunks = {
			chunks: "all",
			name: false,
		};

		// inject the hot module reloader code
		config.entry.unshift("webpack-plugin-serve/client");

		config.plugins.push(
			new WPS.WebpackPluginServe({
				port: bundle.config.serve.port,
				static: bundle.config.serve.static,
				historyFallback: true,
			})
		);
	}

	if (bundle.isProduction) {
		config.optimization.splitChunks = {
			name: false,
			chunks: "async",
			minSize: 30000,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: "~",
			cacheGroups: {
				vendors: {
					name: `chunk-vendors`,
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					chunks: "initial",
				},
				common: {
					name: `chunk-common`,
					minChunks: 2,
					priority: -20,
					chunks: "initial",
					reuseExistingChunk: true,
				},
			},
		};
	}
};
