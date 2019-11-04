import React from "react";
import { useSpring, config, animated } from "react-spring";
import $, { css } from "./style.css";

export default ({
	title,
	date,
	category,
	content,
	more,
	lastTitle,
	lastDate,
	lastContent,
	lastMore,
	lastCategory,
}) => {
	const springTitle = useSpring({
		config: { delay: 150, duration: 200, ...config.slow },
		from: { opacity: 0, transform: "translateY(3rem)" },
		to: { opacity: 1, transform: "translateY(0)" },
		reset: true,
	});

	const springDetails = useSpring({
		config: { delay: 250, duration: 150, ...config.slow },
		from: { opacity: 0, transform: "translateY(1rem)" },
		to: { opacity: 1, transform: "translateY(0)" },
		reset: true,
	});

	const springContent = useSpring({
		config: { delay: 300, duration: 150, ...config.slow },
		from: { opacity: 0 },
		to: { opacity: 1 },
		reset: true,
	});

	return (
		<b className={$.content_container}>
			<animated.div className={$.content_title} style={springTitle}>
				{title}
			</animated.div>

			<animated.div className={$.details_section} style={springDetails}>
				<b className={$.category}>{category}</b>
				<b className={$.date}>{date}</b>
			</animated.div>

			<animated.div className={$.content} style={springContent}>
				{content.map((paragraph, key) => (
					<b key={key} className={$.paragraph}>
						{paragraph}
					</b>
				))}
				<a className={$.more} href={more}>
					Read more
				</a>
			</animated.div>
		</b>
	);
};
