export default async bundle => {
	const compiler = await bundle.compiler();

	const watchOptions = {
		aggregateTimeout: 300,
		ignored: ["node_modules"],
	};

	const watcher = compiler.watch(watchOptions, (error, stats) => {
		// we don't log here, as FriendlyError plugin is used
	});

	// watch variables for changes
	bundle.variables.watch((variables, event) => {
		console.log(`watch:variables [change] "${event.path}"`);

		// rebundle the code
		watcher.invalidate();
	});
};
