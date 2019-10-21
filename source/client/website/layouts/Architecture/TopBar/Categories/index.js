import React, { useState, useContext } from "react";
import {
	ArchitectureState,
	ArchitectureDispatch,
} from "$website/layouts/Architecture";
import { useSpring, animated, config } from "react-spring";
import $, { css } from "./style.css";

export default () => {
	const dispatch = useContext(ArchitectureDispatch);
	const state = useContext(ArchitectureState);

	const { categories, selectedCategoryLabel } = state;

	const springOverlay = useSpring({
		config: {
			duration: 700,
			...config.slow,
		},
		from: { width: "100%", opacity: 1 },
		to: { width: "0", opacity: 0.9 },
	});

	return (
		<b className={$.categories_container}>
			{categories.map((category, key) => (
				<b
					key={key}
					className={$.category}
					onClick={() => {
						category.label != selectedCategoryLabel
							? dispatch({
									type: "selectArticleByCategoryIndex",
									index: key,
							  })
							: null;
					}}
				>
					{category.label}
				</b>
			))}

			<animated.div
				className={$.categories_overlay}
				style={springOverlay}
			/>
		</b>
	);
};
