import webpackConfig from "./webpackConfig.js";

export default {
	name: "Nore TOML",
	handle: "toml",

	async webpack(bundle) {
		return await webpackConfig(bundle);
	},
};
