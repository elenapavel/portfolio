import Copy from "copy-webpack-plugin";
import { autoload } from "@nore/webpack";

export default (bundle, config) => {
	// extend webpack path aliases
	if (bundle.config.alias) {
		const { alias } = bundle.config;

		for (const key in alias) {
			let path = bundle.config.alias[key];

			if (path[0] === "~") {
				path = config.resolve.alias["~"] + path.slice(1);
			}

			config.resolve.alias[key] = path;
		}
	}

	// dynamically load paths specified in bundle
	// config files under `autoload` field
	if (bundle.config.autoload) {
		autoload(bundle.config.autoload, config);
	}

	// use webpack copy plugin to copy files from a path to another
	if (bundle.config.copy) {
		config.plugins.push(new Copy(bundle.config.copy, { context: bundle.path }));
	}
};
