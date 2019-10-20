import ImageminPlugin from "imagemin-webpack";

export default ({ bundle, imageminOptions, isLossy }) => {
	const loaders = [
		{
			loader: "url-loader",
			options: {
				fallback: "file-loader",
				// limit image size to 18kb
				limit: 18000,
				// output images path
				name: "images/[name].[hash:8].[ext]",
			},
		},
	];

	if (bundle.isForWeb && bundle.isProduction) {
		const plugins = ["gifsicle", imageminOptions.gifsicle];

		if (isLossy) {
			plugins.push(
				["mozjpeg", imageminOptions.mozjpeg],
				["pngquant", imageminOptions.pngquant]
			);
		} else {
			plugins.push(
				["jpegtran", imageminOptions.jpegtran],
				["optipng", imageminOptions.optipng]
			);
		}

		loaders.push({
			loader: ImageminPlugin.loader,
			options: {
				bail: false,
				cache: bundle.cachePath,
				imageminOptions: { plugins },
			},
		});
	}

	return loaders;
};
