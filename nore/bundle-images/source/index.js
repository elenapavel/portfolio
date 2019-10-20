import webpackConfig from "./webpackConfig.js";

export default {
	name: "Nore Images",
	handle: "images",

	async webpack(bundle) {
		return await webpackConfig(bundle);
	},
};
