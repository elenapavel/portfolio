import React, { useContext } from "react";
import { UniverseState, UniverseDispatch } from "~/client/pages/UniverseFacts";

import { useSpring, useTrail, config, animated } from "react-spring";

import $ from "./style.css";

export default () => {
	const dispatch = useContext(UniverseDispatch);
	const state = useContext(UniverseState);

	const { categories, selectedCategoryIndex, menuIsOpen, view } = state;

	const menuItemIn = {
		opacity: 1,
		x: 0,
	};
	const menuItemOut = {
		opacity: 0,
		x: 100,
	};
	const menuIconClasses = `${$.menu} ion-navicon`;

	const springContainer = useSpring({
		config: config.stiff,
		from: { opacity: `${view == "category" ? 1 : 0}` },
		to: { opacity: `${view == "category" ? 1 : 0}` },
	});

	const menuVisibility = menuIsOpen ? menuItemIn : menuItemOut;

	const trailCategories = useTrail(categories.length, {
		config: { mass: 1, tension: 230, friction: 26 },
		x: menuVisibility.x,
		opacity: menuVisibility.opacity,
		from: menuVisibility,
		to: menuVisibility,
	});

	return (
		<div>
			<div
				className={menuIconClasses}
				onClick={() => dispatch({ type: "toggleMenu" })}
			/>
			<div
				className={$.menu_container}
				style={{
					opacity: menuIsOpen ? 1 : 0,
					transform: `translateX(${menuIsOpen ? "0" : "100%"})`,
				}}
			>
				<animated.div
					className={$.categories_container}
					style={springContainer}
				>
					{trailCategories.map(({ x, opacity, ...rest }, index) => {
						const categoryClasses = `${$.category} ${
							index == selectedCategoryIndex ? $.category_active : ""
						}`;

						return (
							<animated.div
								key={index}
								style={{
									transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
									opacity: opacity,
								}}
							>
								<div
									className={categoryClasses}
									onClick={() =>
										dispatch({
											type: "selectCategoryByIndex",
											index: index,
										})
									}
								>
									{categories[index].title}
								</div>
							</animated.div>
						);
					})}
				</animated.div>
			</div>
		</div>
	);
};
