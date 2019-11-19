import React from "react";
import { useSprings, animated } from "react-spring";
import Item from "./Item";
import Bullets from "~/client/pages/UniverseFacts/Bullets";

import $ from "./style.css";

export default ({ items }) => {
	const springItems = useSprings(
		items.length,
		items.map((item, index) => ({
			delay: 200 + 100 * index,
			duration: 300,
			from: { opacity: 0, x: 25, marginRight: "2rem" },
			to: { opacity: 1, x: 0, marginRight: "2rem" },
		}))
	);

	return (
		<div>
			<div className={$.list_items}>
				{items.length
					? items != null && items.length
						? springItems.map(({ x, opacity, ...rest }, index) => {
								return (
									<animated.div
										key={index}
										style={{
											...rest,
											opacity: opacity,
											transform: x.interpolate(x => `translate3d(${x}rem,0,0)`),
										}}
									>
										<Item
											isActive={0 == index}
											backgroundImage={items[index].image}
											title={items[index].title}
											index={index}
										/>
									</animated.div>
								);
						  })
						: null
					: null}
			</div>
			<div className={$.bullets}>
				<Bullets />
			</div>
		</div>
	);
};
