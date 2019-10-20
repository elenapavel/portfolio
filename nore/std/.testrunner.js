import tap from "tape";
import readDirectory from "./fs/readDirectory.js";
import flatten from "./array/flatten.js";

const path = process.cwd();

const folders = [
	"array",
	"assert",
	"error",
	"fs",
	"html",
	"object",
	"path",
	"string",
	"time",
	"url",
	"utils",
];

Promise.all(folders.map(folder => readDirectory(`${path}/${folder}`)))
	.then(results => flatten(results).filter(file => file.includes(".test.js")))
	.then(files => files.map(file => import(file)))
	.catch(error => {
		console.error(error);
	});
