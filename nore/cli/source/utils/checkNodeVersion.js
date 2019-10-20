import semver from "semver";
import chalk from "chalk";
import readPackage from "./readPackage.js";

readPackage().then(pkg => {
	const wanted = pkg.engines.node;
	const actual = process.version;

	const message = `
  Nore requires a Node.js version ${wanted}, you are using ${actual}. Please upgrade your Node.js version.
`;

	if (!semver.satisfies(actual, wanted)) {
		console.log(chalk.red(message));
		process.exit(1);
	}
});
