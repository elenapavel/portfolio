import getNodeExternals from "webpack-node-externals";
import webpack from "webpack";

const { LimitChunkCountPlugin } = webpack.optimize;
const __dirname = import.meta.url.slice(7, import.meta.url.lastIndexOf("/"));

export default (bundle, config) => {
	config.entry = [bundle.config.entry || bundle.config.handle];

	config.output = {
		path: bundle.outputPath,
		filename: "index.js",

		// https://github.com/webpack/webpack/issues/1114
		libraryTarget: "commonjs2",

		// Workaround for Webpack 4 Bug:
		// https://github.com/webpack/webpack/issues/6522
		globalObject: "this",
	};

	// ignore modules from node_modules folder
	config.externals.push(
		getNodeExternals({
			whitelist: [
				// ignore @nore modules
				/@nore.+/,
				// CSS imports
				/\.(css|less|scss|sss)$/,
				// image imports
				/\.(bmp|gif|jpe?g|png|svg)$/,
				// process some node_modules
				...bundle.config.node_modules,
			],
		})
	);

	// inject custom node globals to source
	config.entry.unshift(`${__dirname}/globals.js`);

	// bundle all files into one
	config.plugins.push(new LimitChunkCountPlugin({ maxChunks: 1 }));

	// turn off performance hints on node builds
	config.performance = false;
};
