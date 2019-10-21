import React from "react";
import { useTransition, animated, config } from "react-spring";
import $, { css } from "./style.css";

export default ({ label, index, total, lastIndex }) => {
	const formattedIndex = parseInt(index) + 1;
	const lastFormattedIndex = parseInt(lastIndex) + 1;
	const formattedTotal = parseInt(total);

	const transitionIndex = useTransition(index, null, {
		config: config.woobly,
		from: { opacity: 0, transform: "translateY(100%)" },
		enter: { opacity: 1, transform: "translateY(0%)" },
		leave: {
			opacity: 0,
			transform: "translateY(-100%)",
		},
	});

	return (
		<div className={$.container}>
			<div className={$.label}>{label}</div>
			<div className={$.progress}>
				{transitionIndex.map(({ props }, key) => (
					<animated.div
						key={(index, lastIndex)}
						style={{
							position: "absolute",
							left: "2rem",
							...props,
						}}
					>
						{formattedIndex}
					</animated.div>
				))}
				<div className={$.total}>{formattedTotal}</div>
			</div>
		</div>
	);
};
