import autoprefixer from "autoprefixer";
import nested from "postcss-nested";
import fixFlexbox from "postcss-flexbugs-fixes";
import colorFunction from "postcss-color-function";
import colorHexAlpha from "postcss-color-hex-alpha";
import customMedia from "postcss-custom-media";
import selectorNotFix from "postcss-selector-not";
import imageSetFunction from "postcss-image-set-function";
import pleasefilters from "pleeease-filters";
import varsPlugin from "./variables.js";
import responsiveUnit from "./responsiveUnit.js";
import { merge } from "@nore/std/object";

export const variables = varsPlugin();

export default async bundle => {
	const plugins = [
		// SCSS like variables: `color: $text_color`
		variables,

		// set a unit in `ru` and converts it to `rem`
		// 200ru -> 12.5rem, based on 16px rem value
		responsiveUnit,

		// use Custom Media Queries in CSS (https://git.io/fxnCW)
		// ex: `@custom-media --small-viewport (max-width: 30em)`
		customMedia,

		// unwrap nested rules like how Sass does it (https://git.io/vUBoT)
		nested({
			// bubble only some at-rules
			bubble: ["media"],
		}),

		// image-set() helper function (https://git.io/fxfwu)
		imageSetFunction(),

		// fix flexbox issues on older browsers
		fixFlexbox,

		// https://git.io/fxnC4
		// convert `not(:first-child, .special)`
		// to `:not(:first-child):not(.special)`
		selectorNotFix,

		// Convert CSS shorthand filters to SVG equivalent for old browsers
		pleasefilters(),

		// transform CSS color function to more compatible CSS
		colorFunction(),
		colorHexAlpha(),

		// add vendor prefixes to rules
		autoprefixer({
			browsers: bundle.browserslist,
			// fix flexbox and grid issues on IE11
			flexbox: "no-2009",
			grid: true,
		}),
	];

	const config = {
		plugins,
		ident: "postcss",
		sourceMap: bundle.isDevelopment,
	};

	// try to load external babel config files
	const configs = await bundle.loadConfig("postcss", config);

	return merge(config, ...configs);
};
