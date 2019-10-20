import { keys } from "@nore/std/object";
import plugins from "../plugins.js";
import state from "../state.js";
import PluginError from "./PluginError.js";
import register from "./register.js";

export default async function load() {
	const stack = plugins.concat([
		// TODO: add a way to load plugins from DB
	]);

	const toLoad = stack.map(plugin => plugin.handle);

	loading: while (stack.length) {
		const plugin = stack.shift();

		// if dependencies are not loaded, push to loading stack
		if (plugin.dependencies) {
			for (const dependency of keys(plugin.dependencies)) {
				// missing dependency
				if (!toLoad.includes(dependency)) {
					const error = new PluginError(PluginError.MISSING_DEPENDENCY, {
						handle: plugin.handle,
						dependency,
					});

					plugin.isDisabled = true;
					state.errors.add(error);
				}
				// TODO: add version checking using semver
				else if (!state.plugins.has(dependency)) {
					stack.push(plugin);

					continue loading;
				}
			}
		}

		await register(plugin);
	}
}
