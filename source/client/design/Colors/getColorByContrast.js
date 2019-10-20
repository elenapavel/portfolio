import variables from "@nore/variables.json";
import getContrastRatio from "./getContrastRatio.js";

export default function getColorByContrast(background) {
	const white = variables["color.white"];
	const black = variables["color.black"];

	const whiteRatio = getContrastRatio(white, background);
	const blackRatio = getContrastRatio(black, background);

	return whiteRatio > blackRatio ? white : black;
}
