import { readDirectory, itExists } from "@nore/std/fs";
import webpackConfig from "./webpackConfig.js";
import watcher from "./watcher.js";
import toCSSFormat from "./utils/toCSSFormat.js";

export default {
	name: "Nore Variables",
	handle: "variables",

	async webpack(bundle) {
		return await webpackConfig(bundle);
	},

	plug: bundle => ({
		variables: {
			path: `${bundle.sourcePath}/${bundle.config.variables || "variables"}`,

			async load() {
				if (!(await itExists(this.path))) {
					return {};
				}

				const files = await readDirectory(this.path);
				const datasets = await Promise.all(
					files.map(file => bundle.load(file))
				);
				const variables = toCSSFormat(datasets, files);

				if (variables) {
					await bundle.emit("variables", variables);
				}

				return variables || {};
			},

			watch(onChange) {
				watcher(this.path, async event => {
					const variables = await this.load();

					if (onChange) {
						await onChange(variables, event);
					}
				});
			},
		},
	}),
};
