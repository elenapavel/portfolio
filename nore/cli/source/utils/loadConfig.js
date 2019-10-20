import { readDirectory, readFile, itExists } from "@nore/std/fs";
import { isObject, isArray } from "@nore/std/assert";
import { merge } from "@nore/std/object";
import yaml from "yaml";
import toml from "toml";

function splitByMode(source, mode, parse) {
	const regex = /#\s*(\w+)\s*#\n/g;
	const parts = source.split(regex);
	const config = { default: parse(parts[0]) };

	for (let i = 1, label = ""; i < parts.length; ++i) {
		if (Boolean(i % 2)) {
			label = parts[i];
		} else {
			config[label.toLowerCase()] = parse(parts[i]);
		}
	}

	return merge(config.default, config[mode] || {});
}

// converts config key from snake_case to camelCase
// ex: source_path -> sourcePath
function toCamelCase(config) {
	if (!isObject(config)) return config;
	if (isArray(config)) return config.map(toCamelCase);

	const regex = /_\w/g;
	const toReplace = (m, n) => m[1].toUpperCase();
	const result = {};

	for (const key of Object.keys(config)) {
		const fmt = key.replace(regex, toReplace);

		result[fmt] = toCamelCase(config[key]);
	}

	return result;
}

async function loadByType(type, file, mode) {
	if (type === "js") return loadJSConfig(file, mode);
	if (type === "toml") return loadTOMLConfig(file, mode);
	if (type === "yaml") return readYAMLFile(file, mode);
}

async function loadJSConfig(file, mode) {
	const config = await import(file);

	if (!mode) return config.default;

	return merge(config.default, config[mode] || {});
}

async function loadTOMLConfig(file, mode) {
	const source = await readFile(file);

	if (!mode) return toml.parse(source);

	return splitByMode(source, mode, toml.parse);
}

async function readYAMLFile(file, mode) {
	const source = await readFile(file);

	if (!mode) return yaml.parse(source);

	return splitByMode(source, mode, yaml.parse);
}

function getFilesToTry(path, handle, mode) {
	const exts = ["js", "yaml", "toml"];
	const partial = `${path}/config/${handle}`;

	const byMode = type => ({ type, file: `${partial}.${mode}.${type}` });
	const byHandle = type => ({ type, mode, file: `${partial}.${type}` });

	return [...exts.map(byMode), ...exts.map(byHandle)];
}

async function loadConfigByHandle(path, handle, mode) {
	const files = getFilesToTry(path, handle, mode);

	for (const { type, file, mode } of files) {
		if (await itExists(file)) {
			const config = await loadByType(type, file, mode);

			return toCamelCase(config);
		}
	}
}

export default async function loadConfig(options = {}) {
	const { path, handle, mode } = options;
	const config = await loadConfigByHandle(path, handle, mode);

	return config ? merge(config, options) : null;
}
