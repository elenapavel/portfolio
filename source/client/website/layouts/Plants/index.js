import React, { useState, useEffect, useReducer, useCallback } from "react";
import reducer from "./reducer.js";
import Plantoid from "./Plantoid";
import Menu from "./Menu";
import $, { css } from "./style.css";

export const PlantsState = React.createContext(null);
export const PlantsDispatch = React.createContext(null);

export default ({ data }) => {
	const initialState = {
		logo: data.logo,
		sections: data.sections,
		section: data.sections[0],
		plants: data.sections[0].plants,
		selectedPlantIndex: 0,
		lastSelectedPlantIndex: null,
		socialMedia: data.socialMedia,
		isMenuOpened: false,
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	const styleIn = {
		opacity: 0.5,
		transform: "translateX(-16rem)",
	};

	const styleOut = {
		opacity: 1,
		transform: "translateX(0%)",
	};

	const menuClasses = `${$.menu} ion-navicon`;

	return !state ? null : (
		<PlantsDispatch.Provider value={dispatch}>
			<PlantsState.Provider value={state}>
				<b className={$.application}>
					<b>
						<b
							className={$.content}
							style={state.isMenuOpened ? styleIn : styleOut}
						>
							<Plantoid />
						</b>
						<b
							className={menuClasses}
							onClick={() => dispatch({ type: "toggleMenu" })}
						/>
						<Menu
							isOpen={state.isMenuOpened}
							items={state.plants}
							selectedIndex={state.selectedPlantIndex}
							onSelect={index =>
								dispatch({
									type: "selectPlantByIndex",
									index: index,
								})
							}
						/>
					</b>
				</b>
			</PlantsState.Provider>
		</PlantsDispatch.Provider>
	);
};
