import React, { useState, useContext } from "react";
import { PlantsState, PlantsDispatch } from "$website/layouts/Plants";
import $, { css } from "./style.css";

export default () => {
	const actionBack = $.action + " ion-ios-arrow-back";
	const actionNext = $.action + " ion-ios-arrow-forward";

	const dispatch = useContext(PlantsDispatch);
	const state = useContext(PlantsState);

	const { selectedPlantIndex, isMenuOpened } = state;

	return (
		<div className={$.actions}>
			<div
				className={actionBack}
				onClick={() => {
					!isMenuOpened
						? dispatch({
								type: "selectPlantByIndex",
								index: selectedPlantIndex - 1,
						  })
						: null;
				}}
			/>
			<div
				className={actionNext}
				onClick={() => {
					!isMenuOpened
						? dispatch({
								type: "selectPlantByIndex",
								index: selectedPlantIndex + 1,
						  })
						: null;
				}}
			/>
		</div>
	);
};
