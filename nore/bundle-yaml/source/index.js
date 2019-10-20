import webpackConfig from "./webpackConfig.js";

export default {
	name: "Nore YAML",
	handle: "yaml",

	async webpack(bundle) {
		return await webpackConfig(bundle);
	},
};
