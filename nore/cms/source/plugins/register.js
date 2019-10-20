import { merge } from "@nore/std/object";
import log from "../log.js";
import state from "../state.js";
import validate from "./schema.js";
import PluginError from "./PluginError.js";

export default async function register(config) {
	// update plugin settings
	const plugin = merge(config);

	// TODO: load config from and and merge
	plugin.settings = merge(plugin.settings, {});

	// store the plugin into state
	state.plugins.set(plugin.handle, plugin);

	try {
		// check plugin format
		if (!validate(plugin)) {
			throw new PluginError(PluginError.SETTINGS, {
				handle: plugin.handle || plugin.name,
				errors: validate.errors,
			});
		}

		log.debug(`Plugin ${plugin.handle} registered`);

		// ignore disabled plugins
		if (plugin.isDisabled) return;
		// ignore plugins who don't require initialization
		if (!plugin.initialize) return;

		// initialize the plugin
		plugin.instance = await plugin.initialize(plugin.settings);

		log.debug(`Plugin ${plugin.handle} initialized`);
	} catch (error) {
		log.debug(error, `Plugin ${plugin.handle} is disabled due to errors`);

		plugin.isDisabled = true;
		state.errors.add(error);
	}
}
