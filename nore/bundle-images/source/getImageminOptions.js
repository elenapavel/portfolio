export default async bundle => {
	const config = {
		// basic
		gifsicle: {
			interlaced: true,
		},
		svgo: {
			removeTitle: true,
			removeDimensions: true,
			removeViewBox: false,
			convertPathData: false,
		},
		// lossless
		jpegtran: {
			progressive: true,
		},
		optipng: {
			optimizationLevel: 5,
		},
		// lossy
		mozjpeg: {
			progressive: true,
			arithmetic: false,
		},
		pngquant: {},
	};

	// load external config: config/[handle].imagemin.js
	await bundle.loadConfig("imagemin", config);

	return config;
};
