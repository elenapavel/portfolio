import { deleteDirectory } from "@nore/std/fs";
import { Bundle } from "@nore/bundler";
import loadConfig from "../utils/loadConfig.js";
import * as errors from "../utils/errorMessages.js";

export default async ({ args }) => {
	const options = {
		path: args["--path"],
		mode: args["--mode"] || "production",
		isDebug: args["--debug"],
		handle: args._.slice(1).shift(),
	};

	if (!options.handle) {
		return console.warn(errors.noHandles({ command: "start" }));
	}

	const config = await loadConfig(options);

	if (!config) {
		return console.warn(errors.noBundleFound({ handle: options.handle }));
	}

	// make sure NODE_ENV is set
	process.env["NODE_ENV"] = options.mode;

	// create bundle
	const bundle = new Bundle(config);

	// delete any previous build
	await deleteDirectory(bundle.outputPath);

	// initialize plugins and load webpack configs
	await bundle.initialize();

	// initialize the compiler
	const compiler = await bundle.compiler();

	// run the compiler
	compiler.run((error, stats) => {
		if (error || stats.compilation.errors.length) {
			bundle.log.error(error || stats.compilation.errors);
		} else {
			bundle.log.info(`Bundle "${bundle.handle}" was compiled`);
		}
	});
};
