import React from "react";

import { useSprings, animated } from "react-spring";

import $ from "./style.css";

export default ({ content }) => {
	const springItems = useSprings(
		content.length,
		content.map((item, index) => ({
			delay: 100 + 100 * index,
			duration: 300,
			from: { opacity: 0, x: 10 },
			to: { opacity: 1, x: 0 },
		}))
	);

	return springItems.map(({ x, opacity, ...rest }, index) => (
		<animated.div
			key={index}
			style={{
				...rest,
				opacity: opacity,
				transform: x.interpolate(x => `translate3d(${x}rem,0,0)`),
			}}
			className={$.content_field}
		>
			<div className={$.content_title}>{content[index].title}</div>

			<div>
				{content[index].paragraphs != null &&
				content[index].paragraphs.length
					? content[index].paragraphs.map((paragraph, index) => (
							<div key={index} className={$.content_paragraph}>
								{paragraph}
							</div>
					  ))
					: null}
			</div>
		</animated.div>
	));
};
