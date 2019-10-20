import { itExists, readJSONFile } from "@nore/std/fs";
import { join } from "@nore/std/path";
import readTOMLFile from "./readTOMLFile.js";
import readYAMLFile from "./readYAMLFile.js";

const extensions = [".js", ".json", ".yaml", ".toml"];
const TOML_FILE = /\.toml$/;
const YAML_FILE = /\.yaml$/;
const JSON_FILE = /\.json$/;

async function tryFiles(...files) {
	for (const file of files) {
		if (await itExists(file)) {
			if (TOML_FILE.test(file)) {
				return readTOMLFile(file);
			}

			if (YAML_FILE.test(file)) {
				return readYAMLFile(file);
			}

			if (JSON_FILE.test(file)) {
				return readJSONFile(file);
			}

			return await import(file);
		}
	}

	return null;
}

export default async function loadFile(...paths) {
	const file = join.apply(null, paths);
	const files = extensions.map(ext => file + ext);

	return await tryFiles(file, ...files);
}
