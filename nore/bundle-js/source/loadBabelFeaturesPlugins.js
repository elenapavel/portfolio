import defineConstants from "babel-plugin-transform-define";
import macros from "babel-plugin-macros";

export default async bundle => {
	const plugins = [
		// compile time code replacement
		[defineConstants, bundle.config.constants],

		// use compile-time code transformation
		// without adding them to babel plugins
		macros,
	];

	return plugins;
};
