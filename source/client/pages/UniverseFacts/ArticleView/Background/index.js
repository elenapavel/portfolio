import React, { useState, useEffect, useContext } from "react";
import { debounce } from "@nore/std/utils";
import { UniverseState, UniverseDispatch } from "~/client/pages/UniverseFacts";

import { useTransition, config, animated } from "react-spring";

import $ from "./style.css";

export default () => {
	const [backgroundWidth, setBackgroundWidth] = useState(
		window.innerWidth > 1599
			? 100 - 96000 / window.innerWidth + "%"
			: window.innerWidth > 1071
			? 100 - 64000 / window.innerWidth + "%"
			: "100%"
	);

	useEffect(initialize, []);

	function initialize() {
		const onResize = debounce(calcBackgroundWidth, 200);

		function calcBackgroundWidth() {
			setBackgroundWidth(
				window.innerWidth > 1439
					? 100 - 96000 / window.innerWidth + "%"
					: window.innerWidth > 1071
					? 100 - 64000 / window.innerWidth + "%"
					: "100%"
			);
		}

		calcBackgroundWidth();
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}

	const dispatch = useContext(UniverseDispatch);
	const state = useContext(UniverseState);

	const { view, selectedArticleIndex, selectedCategoryArticles } = state;

	const backgroundImage =
		selectedArticleIndex != null
			? selectedCategoryArticles[selectedArticleIndex].image
			: "";

	const transitionContainer = useTransition(selectedArticleIndex, null, {
		config: config.slow,
		from: { width: "0%" },
		enter: { width: `${view == "article" ? backgroundWidth : "0%"}` },
		leave: { width: "0%" },
	});

	return transitionContainer.map(({ props }, key) => {
		return (
			<animated.div
				key={key}
				className={$.background_container}
				style={{
					backgroundImage: `url(${backgroundImage})`,
					...props,
				}}
			/>
		);
	});
};
