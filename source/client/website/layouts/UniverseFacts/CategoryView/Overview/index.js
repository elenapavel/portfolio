import React from "react";

import { useTransition, animated } from "react-spring";

import $ from "./style.css";

export default ({ title, description, index }) => {
	const transitionContainer = useTransition(index, null, {
		duration: 300,
		delay: 100,
		from: { opacity: 0, transform: "translateY(-100%)" },
		enter: {
			opacity: 1,
			transform: "translateY(0%)",
		},
		leave: {
			opacity: 0,
			transform: "translateY(100%)",
		},
	});

	return transitionContainer.map(({ props }, key) => (
		<animated.div className={$.overview_container} style={props} key={key}>
			<div className={$.overview_title}>{title}</div>
			<div className={$.overview_description}>{description}</div>
		</animated.div>
	));
};
