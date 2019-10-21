import React from "react";
import { useTransition, useSpring, animated, config } from "react-spring";
import $, { css } from "./style.css";

export default ({
	title,
	content,
	label,
	// lastTitle,
	// lastContent,
	// lastLabel,
}) => {
	const transitionTitle = useTransition(title, null, {
		from: { opacity: 0, transform: "translateY(100%)" },
		enter: { opacity: 1, transform: "translateY(0%)" },
		leave: { opacity: 0, transform: "translateY(-100%)" },
		config: config.gentle,
	});

	const springContent = useSpring({
		from: { opacity: 0, transform: "translate3d(0, 100%, 0)" },
		to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
		reset: true,
	});

	const transitionLabel = useTransition(label, null, {
		from: {
			opacity: 0,
			transform: "rotateZ(-90deg) translateX(-100%) translateY(100%)",
		},
		enter: {
			opacity: 1,
			transform: "rotateZ(-90deg) translateX(-100%) translateY(0%)",
		},
		leave: {
			opacity: 0,
			transform: "rotateZ(-90deg) translateX(-100%) translateY(-100%)",
		},
		config: config.slow,
	});

	return (
		<div className={$.container}>
			<div className={$.to_top}>
				{transitionTitle.map(({ props }, key) => (
					<animated.div
						key={key}
						className={$.title}
						style={{ ...props }}
					>
						{title}
					</animated.div>
				))}
			</div>
			<div className={$.to_bottom}>
				<div className={$.details}>
					<div className={$.capitalize} style={springContent}>
						{content}
					</div>

					{transitionLabel.map(({ props }, key) => (
						<animated.div
							key={key}
							className={$.label}
							style={{ ...props }}
						>
							{label}
						</animated.div>
					))}
				</div>
			</div>
		</div>
	);
};
