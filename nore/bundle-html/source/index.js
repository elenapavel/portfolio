import webpackConfig from "./webpackConfig.js";

// TODO: implement a simpler HTML plugin
// https://github.com/jxnblk/mdx-go/blob/master/lib/html-plugin.js

export default {
	name: "Nore HTML",
	handle: "html",

	async webpack(bundle) {
		return await webpackConfig(bundle);
	},
};
