import { deleteDirectory } from "@nore/std/fs";
import { getFileName } from "@nore/std/path";
import { Bundle } from "@nore/bundler";
import ProcessManager from "@nore/pm";
import loadConfig from "../utils/loadConfig.js";
import * as errors from "../utils/errorMessages.js";

export default async ({ args }) => {
	const options = {
		path: args["--path"],
		mode: args["--mode"] || "nonono",
		isDebug: args["--debug"],
		handle: args["--config"],
	};

	if (!options.handle) {
		return console.warn("A config must be specified (--config=server)");
	}

	const file = args._.slice(1).shift();
	const target = getFileName(file, ".js");
	const input = `${process.cwd()}/${file}`;
	const outputPath = `.builds/${target}`;

	const config = await loadConfig({ ...options, entry: input });

	if (!config) {
		return console.warn(`Could not load configuration for ${options.config}.`);
	}

	// make sure NODE_ENV is set
	process.env["NODE_ENV"] = options.mode;

	// create bundle
	const bundle = new Bundle({ ...config, outputPath });

	// initialize plugins and load webpack configs
	await bundle.initialize();

	// delete any previous build
	await deleteDirectory(`${process.cwd()}/${outputPath}`);

	// run the compiler
	bundle.compiler().run(async (error, stats) => {
		if (error || stats.compilation.errors.length) {
			return console.log(error || stats.compilation.errors.length);
		}

		const cmd = [process.execPath, outputPath];
		const pm = new ProcessManager(cmd, { stdio: "inherit" });

		await pm.start();
	});
};
