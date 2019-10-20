import webpackConfig from "./webpackConfig.js";

export default {
	name: "Nore Fonts",
	handle: "fonts",

	async webpack(bundle) {
		return await webpackConfig(bundle);
	},
};
