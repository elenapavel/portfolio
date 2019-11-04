import React from "react";
import { useTrail, animated, config } from "react-spring";
import MenuItem from "./MenuItem";
import $, { css } from "./style.css";

export default ({ isOpen, items, selectedIndex, onSelect }) => {
	const menuItemIn = {
		opacity: 1,
		x: 0,
	};
	const menuItemOut = {
		opacity: 0,
		x: 20,
	};

	const menuVisibility = isOpen ? menuItemIn : menuItemOut;

	const trail = useTrail(items.length, {
		config: { mass: 1, tension: 230, friction: 26 },
		x: menuVisibility.x,
		opacity: menuVisibility.opacity,
		from: menuVisibility,
		to: menuVisibility,
	});

	return (
		<b
			className={$.container}
			style={{
				transform: `${
					isOpen ? "translate3d(0,0,0)" : "translate3d(20rem,0,0)"
				}`,
				transition: "transform 0.5s ease-in-out",
			}}
		>
			{trail.map(({ x, opacity, ...rest }, index) => (
				<animated.div
					key={index}
					style={{
						...rest,

						transform: x.interpolate(
							x => `translate3d(${x}vw,0,0)`
						),
						opacity: opacity,
					}}
				>
					<MenuItem
						isSelected={index == selectedIndex}
						name={items[index].scientificName}
						index={index}
						onSelect={index => onSelect(index)}
					/>
				</animated.div>
			))}
		</b>
	);
};
