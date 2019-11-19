import React, { useContext } from "react";
import { UniverseState, UniverseDispatch } from "~/client/pages/UniverseFacts";
import { useSpring, config, animated } from "react-spring";
import Background from "./Background";
import TopPanel from "./TopPanel";
import Overview from "./Overview";
import Listing from "./Listing";

import $ from "./style.css";

export default () => {
	const dispatch = useContext(UniverseDispatch);
	const state = useContext(UniverseState);

	const {
		selectedCategoryArticles,
		view,
		categories,
		selectedCategoryIndex,
	} = state;

	const currentCategory = categories[selectedCategoryIndex];

	const springContainer = useSpring({
		config: config.slow,
		duration: 300,
		from: { opacity: `${view == "category" ? 1 : 0}` },
		to: { opacity: `${view == "category" ? 1 : 0}` },
	});

	const springContent = useSpring({
		config: config.stiff,
		duration: 300,
		from: { opacity: `${view == "category" ? 1 : 0}` },
		to: { opacity: `${view == "category" ? 1 : 0}` },
	});

	return (
		<animated.div style={springContainer}>
			<div className={$.container}>
				<Background />
				<TopPanel />

				<animated.div style={springContent}>
					<Overview
						title={currentCategory.title}
						description={currentCategory.description}
						index={selectedCategoryIndex}
					/>
					<div className={$.list_container}>
						<Listing items={selectedCategoryArticles} />
					</div>
				</animated.div>
			</div>
		</animated.div>
	);
};
