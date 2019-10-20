import webpackConfig from "./webpackConfig.js";

export default {
	name: "Nore JS",
	handle: "js",

	async webpack(bundle) {
		return await webpackConfig(bundle);
	},
};
