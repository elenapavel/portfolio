import { merge } from "@nore/std/object";
import dynamicImport from "@babel/plugin-syntax-dynamic-import";
import classProperties from "@babel/plugin-proposal-class-properties";
import asyncToPromises from "babel-plugin-transform-async-to-promises";
import fixESMImports from "./utils/fixESMImports.js";
import loadBabelReactPlugins from "./loadBabelReactPlugins.js";
import loadBabelFeaturesPlugins from "./loadBabelFeaturesPlugins.js";

export default async bundle => {
	bundle.log.debug("Loading babel config");

	const react = await loadBabelReactPlugins(bundle);
	const features = await loadBabelFeaturesPlugins(bundle);

	const javascript = [
		// transforms JS class properties
		// enable loose mode to use assignment instead of defineProperty
		[classProperties, { loose: false }],
	];

	if (bundle.isForWeb) {
		javascript.push(
			// add syntax support for dynamic `import()`
			dynamicImport
		);

		if (bundle.isProduction) {
			// TODO: switch to @babel/plugin-transform-async-to-generator?
			// adds transform async/await to promise chains
			javascript.push(asyncToPromises);
		}

		// compiles ES2015+ down to ES5 by automatically determining the
		// Babel plugins and polyfills you need based on your targeted browser
		var babelPresetEnvOptions = {
			useBuiltIns: "entry",
			corejs: { version: 3, proposals: false },
			modules: "auto",
			targets: bundle.config.browserslist,
		};
	}

	if (bundle.isForNode) {
		var babelPresetEnvOptions = {
			modules: "commonjs",
			targets: { node: "12.0" },
		};
	}

	const config = fixESMImports({
		presets: [["@babel/preset-env", babelPresetEnvOptions]],
		plugins: [...javascript, ...react, ...features],
		cacheDirectory: bundle.isDevelopment ? `${bundle.cachePath}/babel` : false,
		cacheCompression: false,
		configFile: false,
		babelrc: false,
	});

	bundle.log.debug("Loading external babel config");

	// try to load external babel config files
	await bundle.loadConfig("babel", config);

	// bundle.log.debug(config);

	return config;
};
