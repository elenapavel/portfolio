import state from "../state.js";

export default async function getPlugin(handle) {
	const plugin = state.plugins.get(handle);

	if (!plugin) return null;
	if (plugin.isDisabled) return null;

	return plugin.instance || null;
}
