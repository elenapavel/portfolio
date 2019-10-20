import chokidar from "chokidar";

export default (path, onChange) => {
	const watcher = chokidar.watch("*", {
		ignoreInitial: true,
		cwd: path,
	});

	["change", "add"].forEach(event => {
		watcher.on(event, path => {
			onChange({ type: event, path });
		});
	});
};
