export default {
	cors: {
		// allow CORS in development mode (site.local)
		origin: IS_DEVELOPMENT ? /\.local$/ : false,
		credentials: true,
	},
	cookies: {},
	multipart: {},
};
