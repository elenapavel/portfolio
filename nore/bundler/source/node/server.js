import ProcessManager from "@nore/pm";

export default async bundle => {
	const compiler = await bundle.compiler();
	const cmd = [process.execPath, bundle.outputPath];

	const pm = new ProcessManager(cmd, {
		restartDelay: 300,
		stdio: "inherit",
		cwd: bundle.path,
	});

	async function onCompile(error, stats) {
		if (!error) await pm.restart();
	}

	const watchOptions = {
		aggregateTimeout: 300,
		ignored: ["node_modules"],
	};

	const watcher = compiler.watch(watchOptions, onCompile);

	// watch variables for changes
	bundle.variables.watch((variables, event) => {
		bundle.log.info(`watch:variables [change] "${event.path}"`);

		// rebundle the code
		watcher.invalidate();
	});
};
