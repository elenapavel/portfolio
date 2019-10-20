import pino from "pino";
import webpack from "webpack";
import webpackMerge from "webpack-merge";
import { join, isAbsolute } from "@nore/std/path";
import { isObject, isFunction } from "@nore/std/assert";
import { merge } from "@nore/std/object";
import loadFile from "./utils/loadFile.js";
import Emitter from "./utils/Emitter.js";
import webpackConfig from "./webpackConfig.js";
import nodeServer from "./node/server.js";
import webServer from "./web/server.js";
import plugins from "./plugins.js";
import * as defaults from "./defaults.js";

export default class Bundle extends Emitter {
	constructor(config = {}) {
		super();

		if (!config.handle) {
			throw Error("Bundle is missing `.handle`");
		}

		this.handle = config.handle;
		this.target = config.target || "web";
		this.mode = config.mode || "development";

		// set flags
		this.isDebug = config.isDebug || false;
		this.isForWeb = this.target === "web";
		this.isForNode = this.target === "node";
		this.isDevelopment = this.mode === "development";
		this.isProduction = this.mode === "production";

		// set paths
		const { configPath, sourcePath, outputPath, cachePath } = config;

		this.path = config.path || process.cwd();
		this.configPath = join(this.path, configPath || "config");
		this.sourcePath = join(this.path, sourcePath || "source");
		this.outputPath = join(this.path, outputPath || `.builds/${this.handle}`);
		this.cachePath = join(this.path, cachePath || `.cache`);

		// merge smart defaults with the supplied config
		this.config = merge(defaults[this.target](this), config);

		this.config.constants = merge(this.config.constants, {
			__NODE__: this.isForNode,
			__WEB__: this.isForWeb,
			IS_DEVELOPMENT: this.isDevelopment,
			IS_PRODUCTION: this.isProduction,
			IS_DEBUG: Boolean(config.isDebug),
			CONFIG: config.config || {},
		});

		// setup logger
		this.log = pino({
			name: "bundle",
			level: this.isDebug ? "debug" : "info",
			prettyPrint: this.isDebug && {
				translateTime: "HH:MM:ss",
				ignore: "pid,hostname",
			},
		});

		// the array of plugins to load
		this.plugins = plugins.concat(config.plugins || []);
		// the map holding the plugin instance
		this.plugin = {};
	}

	async initialize() {
		this.log.debug(`Initializing...`);
		// this.log.debug(this.config);

		await this.loadPlugins();
	}

	async loadPlugins() {
		// load and initialize plugins
		for (const plugin of this.plugins) {
			if (!plugin.name)
				throw Error(
					`Missing plugin.name:\n${JSON.stringify(plugin, null, " ")}`
				);

			if (!plugin.handle)
				throw Error(
					`Missing plugin.handle:\n${JSON.stringify(plugin, null, " ")}`
				);

			this.log.debug(`Loading plugin: ${plugin.name}`);

			plugin.bundle = Object.create(this, {
				log: { value: this.log.child({ name: `plugin:${plugin.handle}` }) },
			});

			if (plugin.initialize) {
				await plugin.initialize(plugin.bundle);
			}

			if (isFunction(plugin.plug)) {
				const api = plugin.plug(plugin.bundle);

				for (const handle in api) {
					this.plug(handle, api[handle]);
				}
			}

			this.plugin[plugin.handle] = plugin;
		}
	}

	async compiler() {
		this.log.debug("Loading webpack configuration");

		// load webpack config from plugins
		const configs = [];

		for (const plugin of this.plugins) {
			if (!plugin.webpack) continue;

			this.log.debug(`Loading webpack config from plugin:${plugin.handle}`);

			configs.push(await plugin.webpack(plugin.bundle));
		}

		// merge all webpack configs
		const config = webpackMerge(await webpackConfig(this), ...configs);

		// load external webpack configs
		await this.loadConfig("webpack", config);

		this.log.debug("Initializing webpack compiler");
		// this.log.debug(config);

		return webpack(config);
	}

	async serve() {
		if (this.isForWeb) {
			await webServer(this);
		}

		if (this.isForNode) {
			await nodeServer(this);
		}
	}

	// helper to easily load files based on project path
	async load(request) {
		if (isAbsolute(request)) {
			return loadFile(request);
		} else {
			return loadFile(this.path, request);
		}
	}

	/*
		helper to easily load config based on their name
		ex: `await bundle.loadConfig("babel")`
		will look and return the first file found:
		 1. config/babel.js
		 2. config/[handle].babel.js
		 3. config/[handle].[mode].babel.js
		the files can have one of the these extensions: .js .json .yaml .toml
	*/
	async loadConfig(name, defaults = {}) {
		const paths = [
			`${this.configPath}/${name}`,
			`${this.configPath}/${this.handle}.${name}`,
			`${this.configPath}/${this.handle}.${this.mode}.${name}`,
		];

		const configs = [];

		for (const path of paths) {
			const module = await this.load(path);

			if (module) {
				this.log.debug(
					`Loaded external config: ${path.replace(`${this.configPath}/`, "")}`
				);

				const extend = module.default || module;
				const config = isFunction(extend)
					? await Promise.resolve(extend(defaults, this))
					: extend;

				if (config) configs.push(config);
			}
		}

		return configs;
	}

	plug(namespace, api) {
		if (this[namespace]) {
			throw Error(`Namespace "${namespace}" was already defined.`);
		}

		if (!isObject(api)) {
			throw Error(`The API for "${namespace}" is not an object.`);
		}

		this[namespace] = api;
	}
}
