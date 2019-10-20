import variables from "@nore/variables.json";
import { set, get, keys } from "@nore/std/object";

export default function getColors() {
	const temp = {};

	for (const key of keys(variables)) {
		if (key.indexOf("color.") !== 0) continue;
		// don't overwrite values, ignore base and default values
		if (get(temp, key.split("."))) continue;

		set(temp, key.split("."), variables[key]);
	}

	return temp.color;
}
