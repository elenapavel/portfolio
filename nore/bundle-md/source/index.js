import webpackConfig from "./webpackConfig.js";

export default {
	name: "Nore MD",
	handle: "md",

	async webpack(bundle) {
		return await webpackConfig(bundle);
	},
};
