import React, { useContext } from "react";
import { UniverseState, UniverseDispatch } from "~/client/pages/UniverseFacts";
import { useTransition, config, animated } from "react-spring";

import $ from "./style.css";

export default () => {
	const dispatch = useContext(UniverseDispatch);
	const state = useContext(UniverseState);

	const { view, selectedCategoryIndex, categories } = state;
	const backgroundImage = categories[selectedCategoryIndex].image;

	const transitionContainer = useTransition(selectedCategoryIndex, null, {
		config: { ...config.slow },
		from: { width: "0%" },
		enter: { width: `${view == "category" ? "100%" : "0%"}` },
		leave: { width: "0%" },
	});

	return transitionContainer.map(({ props }, key) => (
		<animated.div
			key={key}
			className={$.background_container}
			style={{
				...props,
				backgroundImage: `url(${backgroundImage})`,
			}}
		/>
	));
};
