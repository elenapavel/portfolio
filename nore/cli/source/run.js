import { itExists } from "@nore/std/fs";
import chalk from "chalk";

const __dirname = import.meta.url.slice(7, import.meta.url.lastIndexOf("/"));

export default async function run(command, args) {
	const file = `${__dirname}/commands/${command}.js`;
	const isFile = await itExists(file);

	if (isFile) {
		import(file).then(module => {
			module.default({ command, args });
		});
	} else {
		console.log(chalk.red(`\n  ERROR: "${command}" is not a valid command.\n`));
		run("help", args);
	}
}
