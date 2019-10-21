import React from "react";
import { useSpring, config, animated } from "react-spring";
import Categories from "./Categories";
import $ from "./style.css";

export default ({ logo, quote }) => {
	const springLogo = useSpring({
		config: config.slow,
		from: { opacity: 0, transform: "translateY(100%)" },
		to: { opacity: 1, transform: "translateY(0)" },
	});

	const springQuote = useSpring({
		config: {
			delay: 100,
			duration: 400,
			...config.slow,
		},
		from: {
			opacity: 0,
			transform: "translateX(-100%)",
		},
		to: { opacity: 1, transform: "translateX(0)" },
	});

	return (
		<b className={$.container}>
			<b className={$.to_left}>
				<b className={$.logo}>
					<animated.div style={springLogo}>
						<img src={logo} />
					</animated.div>
				</b>
				<b className={$.quote}>
					<animated.div style={springQuote}>
						<b>{quote}</b>
					</animated.div>
				</b>
			</b>
			<b className={$.to_right}>
				<Categories />
			</b>
		</b>
	);
};
