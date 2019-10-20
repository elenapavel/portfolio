import { isString } from "@nore/std/assert";

export default function reducer(previous, action) {
	const command = isString(action) ? action : action.type;
	const state = { ...previous };

	switch (command) {
		case "navigation.open":
			state.navigation.isVisible = true;
			state.bar.menu.isActive = true;
			break;

		case "navigation.close":
			state.navigation.isVisible = false;
			state.bar.menu.isActive = false;
			break;

		case "navigation.toggle":
			const isVisible = !state.navigation.isVisible;

			state.navigation.isVisible = isVisible;
			state.bar.menu.isActive = isVisible;
			break;

		default:
			throw Error("Panel: action not found.");
	}

	return state;
}
