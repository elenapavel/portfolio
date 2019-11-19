import React from "react";
import { useSprings, animated } from "react-spring";

import $ from "./style.css";

export default ({ items }) => {
	const springItems = useSprings(
		items.length,
		items.map((item, index) => ({
			delay: 200 + 100 * index,
			duration: 300,
			from: { opacity: 0, x: 20, marginRight: "2rem" },
			to: { opacity: 1, x: 0, marginRight: "2rem" },
		}))
	);

	return (
		<div className={$.gallery_container}>
			{items != null && items.length
				? springItems.map(({ x, opacity, ...rest }, index) => {
						return (
							<animated.div
								key={index}
								style={{
									...rest,
									opacity: opacity,
									transform: x.interpolate(
										x => `translate3d(${x}rem,0,0)`
									),
								}}
							>
								<div
									className={$.gallery_item}
									style={{
										backgroundImage: `url(${
											items[index].image
										})`,
									}}
								/>
							</animated.div>
						);
				  })
				: null}
		</div>
	);
};
