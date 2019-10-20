export const web = bundle => ({
	variables: "variables",

	template: {
		path: "index.html",
	},

	url: {
		host: "127.0.0.1",
		path: "/",
	},

	browserslist: bundle.isDevelopment
		? [">5%"]
		: [
				"> 0.25%",
				"last 1 version",
				"IE >= 11",
				"Safari >= 10",
				"not op_mini all",
				"not dead",
		  ],

	serve: {
		port: 7000,
		static: [bundle.outputPath, `${bundle.sourcePath}/assets`],
	},

	jsx: {
		pragma: "React.createElement",
		pragmaFrag: "React.Fragment",
		useBuiltIns: true,
	},
});

export const node = bundle => ({
	// bundle specific modules from the node_modules folder
	node_modules: [],

	constants: {
		SOURCE_PATH: bundle.isDevelopment ? bundle.sourcePath : null,
		PROJECT_PATH: bundle.isDevelopment ? bundle.path : null,
	},
});
