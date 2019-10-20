export default {
	target: "web",
	browserslist: "last 1 version",
};

export const production = {
	config: {
		url: "production.com",
		port: 2000,
	},
};

export const development = {
	config: {
		url: "development.com",
		port: 3000,
	},
};
