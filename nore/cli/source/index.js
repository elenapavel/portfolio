import cli from "arg";
import run from "./run.js";
import loadDotEnv from "./utils/loadDotEnv.js";
import "./utils/onUnhandledErrors.js";
import "./utils/checkNodeVersion.js";

const defaults = {
	"--path": process.cwd(),
	"--debug": false,
};

const options = {
	// types
	"--config": String,
	"--path": String,
	"--mode": String,
	"--help": Boolean,
	"--test": Boolean,
	"--debug": Boolean,
	"--version": Boolean,

	// aliases
	"-c": "--config",
	"-h": "--help",
	"-p": "--path",
	"-m": "--mode",
	"-t": "--test",
	"-d": "--debug",
	"-v": "--version",
};

const args = Object.assign({}, defaults, cli(options));
const command = args._[0];

// output the version
if (args["--version"]) {
	run("version", args);
}

// output the version
else if (args["--help"] || command === "help" || !command) {
	run("help", args);
}

// load .env config
else {
	loadDotEnv(args["--path"]).then(() => {
		run(command, args);
	});
}
