import React, { useState, useContext } from "react";
import { PlantsState, PlantsDispatch } from "~/client/pages/Plants";
import Logo from "./Logo";
import Content from "./Content";
import SocialMedia from "./SocialMedia";
import $, { css } from "./style.css";

export default function Plantoid() {
	const dispatch = useContext(PlantsDispatch);
	const state = useContext(PlantsState);
	const {
		logo,
		section,
		plants,
		lastSelectedPlantIndex,
		selectedPlantIndex,
		socialMedia,
	} = state;

	const lastSelectedPlant =
		lastSelectedPlantIndex != null
			? lastSelectedPlant
			: {
					scientificName: "",
					commonName: "",
					content: "",
					category: "",
					species: "",
					image: "",
			  };

	const selectedPlant = plants[selectedPlantIndex];

	return (
		<b className={$.application}>
			<b className={$.to_top}>
				<Logo logo={logo} />
			</b>
			<b className={$.to_center}>
				<Content
					title={selectedPlant.scientificName}
					name={selectedPlant.commonName}
					content={selectedPlant.content}
					category={selectedPlant.category}
					species={selectedPlant.species}
					image={selectedPlant.image}
					lastTitle={lastSelectedPlant.scientificName}
					lastName={lastSelectedPlant.commonName}
					lastContent={lastSelectedPlant.content}
					lastCategory={lastSelectedPlant.category}
					lastSpecies={lastSelectedPlant.species}
					lastImage={lastSelectedPlant.image}
					label={section.label}
					lastIndex={plants.indexOf(selectedPlant)}
					currentIndex={selectedPlantIndex}
					total={plants.length}
				/>
			</b>
			<b className={$.to_right}>
				<SocialMedia items={socialMedia} />
			</b>
		</b>
	);
}
