import { isString } from "@nore/std/assert";

export default function reducer(previous, action) {
	const command = isString(action) ? action : action.type;
	const state = { ...previous };

	switch (command) {
		case "selectPlantByIndex":
			const index = action.index;

			state.lastSelectedPlant = state.selectedPlant;

			if (index == state.plants.length) {
				state.selectedPlantIndex = 0;
			} else if (index == -1) {
				state.selectedPlantIndex = state.plants.length - 1;
			} else {
				state.selectedPlantIndex = index;
			}

			state.selectedPlant = state.plants[state.selectedPlantIndex];

			state.isMenuOpened = false;

			break;

		case "toggleMenu":
			state.isMenuOpened = !state.isMenuOpened;

			break;

		case "set":
			state = action.initialState;

			break;

		default:
			throw Error("Website: action not found.");
	}

	return state;
}
