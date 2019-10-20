import babel from "@nore/bundle-js/source/babel";

export default async (bundle, imageminOptions) => [
	{
		loader: "babel-loader",
		options: await babel(bundle),
	},
	{
		loader: "@svgr/webpack",
		options: { babel: false },
	},
];
