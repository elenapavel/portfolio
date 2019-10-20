import getImageminOptions from "./getImageminOptions.js";
import pngJpgGifLoaders from "./pngJpgGifLoaders.js";
import svgLoaders from "./svgLoaders.js";
import svgLoadersInline from "./svgLoadersInline.js";

export default async bundle => {
	const imageminOptions = await getImageminOptions(bundle);

	const imagesRule = {
		test: /\.(jpe?g|png|gif)$/,
		oneOf: [
			{
				resourceQuery: /lossy/,
				use: pngJpgGifLoaders({ bundle, imageminOptions, isLossy: true }),
			},
			{
				use: pngJpgGifLoaders({ bundle, imageminOptions, isLossy: false }),
			},
		],
	};

	const svgRule = {
		test: /\.svg$/,
		oneOf: [
			{
				use: await svgLoadersInline(bundle, imageminOptions),
				resourceQuery: /inline/,
			},
			{
				use: await svgLoaders({ bundle, imageminOptions, toBase64: true }),
				resourceQuery: /base64/,
			},
			{
				use: await svgLoaders({ bundle, imageminOptions, isRaw: true }),
				resourceQuery: /raw/,
			},
			{ use: await svgLoaders({ bundle, imageminOptions }) },
		],
	};

	return {
		module: { rules: [svgRule, imagesRule] },
	};
};
