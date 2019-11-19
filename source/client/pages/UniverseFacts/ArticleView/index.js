import React, { useContext } from "react";
import { UniverseState, UniverseDispatch } from "~/client/pages/UniverseFacts";
import { useSpring, config, animated } from "react-spring";

import Background from "./Background";
import Bullets from "~/client/pages/UniverseFacts/Bullets";
import Overview from "./Overview";
import Gallery from "./Gallery";
import Content from "./Content";
import Action from "./Action";

import $ from "./style.css";

export default () => {
	const dispatch = useContext(UniverseDispatch);
	const state = useContext(UniverseState);

	const { selectedCategoryArticles, view, selectedArticleIndex } = state;

	const currentArticle =
		selectedArticleIndex != null
			? selectedCategoryArticles[selectedArticleIndex]
			: {
					title: "",
					subtitle: "",
					category: "",
					image: "",
					gallery: [],
					content: [],
			  };

	const springContainer = useSpring({
		config: config.slow,
		duration: 300,
		from: { opacity: `${view == "article" ? 1 : 0}` },
		to: { opacity: `${view == "article" ? 1 : 0}` },
	});

	return (
		<animated.div style={springContainer}>
			<div className={$.container}>
				<Background />
				<Overview
					title={currentArticle.title}
					subtitle={currentArticle.subtitle}
					index={selectedArticleIndex}
				/>
				<div className={$.bullets}>
					<Bullets />
				</div>
				<div className={$.content_container}>
					{currentArticle.gallery.length ? (
						<div className={$.content_gallery}>
							<Gallery items={currentArticle.gallery} />
						</div>
					) : null}
					<div className={$.content}>
						<Content content={currentArticle.content} />
					</div>
				</div>
				<Action onSelect={() => dispatch({ type: "changeViewToCategory" })} />
			</div>
		</animated.div>
	);
};
