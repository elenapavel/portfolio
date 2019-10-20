import classToClassName from "babel-plugin-react-html-attrs";
import renderParams from "babel-plugin-transform-react-render-parameters";
import hoistElements from "@babel/plugin-transform-react-constant-elements";
import reactJSX from "@babel/plugin-transform-react-jsx";
import reactJSXSource from "@babel/plugin-transform-react-jsx-source";
import reactJSXSelf from "@babel/plugin-transform-react-jsx-self";
import loadable from "@loadable/babel-plugin";

// similar to @babel/preset-react
export default async bundle => {
	const plugins = [
		// Transforms JSX class attributes into className
		classToClassName,

		// transforms `render(props, state, context)` to react format
		renderParams,

		// hoist JSX elements to the highest scope to reduce garbage collection
		hoistElements,

		// Turn JSX into JS function calls
		[reactJSX, bundle.config.jsx],
	];

	if (bundle.isForNode) {
		// code splitting via the dynamic import syntax
		plugins.push(loadable);
	}

	if (bundle.isForWeb) {
		if (bundle.isDevelopment) {
			plugins.unshift(
				// adds source file and line number to JSX elements
				reactJSXSource,

				// adds __self prop to JSX elements, which
				// React will use to generate runtime warnings
				reactJSXSelf
			);
		}
	}

	return plugins;
};
