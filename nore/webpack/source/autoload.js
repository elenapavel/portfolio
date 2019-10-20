import VirtualModule from "./VirtualModule";

function toArgs(path) {
	// format: ~/path/*  <- only include files
	if (path.includes("*")) {
		return `"${path.replace(/\/?\*$/, "")}", true, /\.js$/`;
	}

	// format: ~/path  <- include subdirectories
	return `"${path}", true, /index\.js$/`;
}

export default (toImport, config) => {
	const source = toImport.map(toArgs).map(
		(args, i) => `
			const $import_${i} = require.context(${args});
			$import_${i}.keys().forEach(path => $import_${i}(path));
		`
	);

	const module = new VirtualModule({
		name: "@nore/bundler/autoload.js",
		source: source.join(""),
	});

	config.plugins.push(module);
	config.entry.push(`@nore/bundler/autoload.js`);
};
