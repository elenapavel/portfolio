import React, { useEffect, useState } from "react";
import { debounce } from "@nore/std/utils";
import { useSpring, useTransition, config, animated } from "react-spring";

import $, { css } from "./style.css";

export default ({ image, extras, lastImage, lastExtras }) => {
	const [isMobileView, setMobileView] = useState(0);
	useEffect(initialize, []);

	function initialize() {
		const onResize = debounce(setImageIsMobile, 200);

		function setImageIsMobile() {
			setMobileView(window.innerWidth > 767);
		}

		setImageIsMobile();
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}

	const transitionImage = useTransition(image, null, {
		config: config.woobly,
		from: { transform: "scale(1.1)", opacity: 0 },
		enter: { transform: "scale(1)", opacity: 1 },
		leaves: { transform: "scale(0.9)", opacity: 0 },
	});

	const springExtras = useSpring({
		config: config.slow,
		from: { opacity: 0 },
		to: { opacity: 1 },
	});

	const springTitle = useSpring({
		config: config.slow,
		from: {
			opacity: "0",
			transform: "translateY(3rem)",
		},
		to: {
			opacity: "1",
			transform: "translateY(0)",
		},
		reset: true,
	});

	const springContent = useSpring({
		config: config.slow,
		delay: 400,
		duration: 150,
		from: {
			opacity: "0",
			transform: "translateY(3rem)",
		},
		to: {
			opacity: "1",
			transform: "translateY(0)",
		},
		reset: true,
	});
	return (
		<b className={$.image_container}>
			{!isMobileView ? (
				transitionImage.map(({ props }, key) => (
					<animated.div
						key={key}
						style={{
							height: "100%",
							position: "absolute",
							width: "100%",
							...props,
						}}
					>
						<b
							className={$.image}
							style={{
								backgroundImage: `url("${image}")`,
							}}
						/>
					</animated.div>
				))
			) : (
				<b
					className={$.image}
					style={{ backgroundImage: `url("${image}")` }}
				/>
			)}

			<animated.div style={springExtras} className={$.extras}>
				<animated.div style={springTitle} className={$.image_title}>
					{extras.title}
				</animated.div>

				<animated.div style={springContent} className={$.image_content}>
					{extras.content}
				</animated.div>
			</animated.div>
		</b>
	);
};
