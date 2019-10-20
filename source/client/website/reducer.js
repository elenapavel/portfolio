import { isString } from "@nore/std/assert";

export default function reducer(previous, action) {
	const command = isString(action) ? action : action.type;
	const state = { ...previous };

	switch (command) {
		case "navigation.open":
			state.navigation.isVisible = true;
			break;

		case "navigation.close":
			state.navigation.isVisible = false;
			break;

		case "navigation.toggle":
			const isVisible = !state.navigation.isVisible;

			state.navigation.isVisible = isVisible;
			break;

		case "navigation.isMobile":
			state.navigation.isMobile = document.body.offsetWidth < 992;
			break;

		default:
			throw Error("Website: action not found.");
	}

	return state;
}
