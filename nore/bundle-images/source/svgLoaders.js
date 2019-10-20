import ImageminPlugin from "imagemin-webpack";

export default async ({ bundle, imageminOptions, toBase64, isRaw }) => {
	const loaders = [];

	// load SVG file content
	if (isRaw) {
		loaders.push({
			loader: "raw-loader",
			options: {},
		});
	}
	// convert SVG to base64 URI format
	else if (toBase64) {
		loaders.push({
			loader: "url-loader",
			options: {
				fallback: "file-loader",
				mimetype: "image/svg+xml",
				// limit image size to 10kb
				limit: 10000,
				// output images path
				name: "images/[hash].[ext]",
			},
		});
	}
	// load the path to the file on disk
	else {
		loaders.push({
			loader: "file-loader",
			options: {},
		});
	}

	if (bundle.isForWeb && bundle.isProduction) {
		loaders.push({
			loader: ImageminPlugin.loader,
			options: {
				bail: false,
				cache: bundle.cachePath,
				imageminOptions: {
					plugins: ["svgo", imageminOptions.svgo],
				},
			},
		});
	}

	return loaders;
};
