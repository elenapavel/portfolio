import webpackConfig from "./webpackConfig.js";
import { variables } from "./postcss";

export default {
	name: "Nore CSS",
	handle: "css",

	async webpack(bundle) {
		return await webpackConfig(bundle);
	},

	async initialize(bundle) {
		bundle.on("variables", variables.set);
	},
};
