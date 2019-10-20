import readPackage from "../utils/readPackage.js";

export default async () => {
	const pkg = await readPackage();
	console.log(pkg.version);
};
