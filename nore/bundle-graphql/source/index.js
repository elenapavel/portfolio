import webpackConfig from "./webpackConfig.js";

export default {
	name: "Nore GraphQL",
	handle: "gql",

	async webpack(bundle) {
		return await webpackConfig(bundle);
	},
};
