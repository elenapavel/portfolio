import React, { useState, useEffect } from "react";
import { useTransition, animated, config } from "react-spring";
import $, { css } from "./style.css";

export default ({
	title,
	subtitle,
	image,
	index,
	// lastTitle,
	// lastSubtitle,
	// lastImage,
	// lastIndex,
}) => {
	const formattedIndex =
		parseInt(index) + 1 < 10
			? "0" + (parseInt(index) + 1)
			: parseInt(index) + 1;
	// const lastFormattedIndex =
	// 	parseInt(lastIndex) + 1 < 10
	// 		? "0" + (parseInt(lastIndex) + 1)
	// 		: parseInt(lastIndex) + 1;

	const transitionImage = useTransition(image, null, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
	});

	const transitionTitle = useTransition([title, subtitle], null, {
		from: { opacity: 0, transform: "translate3d(0, 100%, 0)" },
		enter: { opacity: 1, transform: "translate3d(0, 0%, 0)" },
		leave: { opacity: 0, transform: "translate3d(0, -100%, 0)" },
	});

	const transitionIndex = useTransition(index, null, {
		from: { opacity: 0, transform: "translate3d(0, 100%, 0)" },
		enter: { opacity: 1, transform: "translate3d(0, 0%, 0)" },
		leave: { opacity: 0, transform: "translate3d(0, -100%, 0)" },
	});

	return (
		<b className={$.container}>
			{transitionImage.map(({ props }, key) => (
				<animated.div
					key={key}
					className={$.image}
					style={{
						position: "absolute",
						backgroundImage: `url(${image})`,
						...props,
					}}
				/>
			))}

			{transitionTitle.map(({ props }, key) => (
				<animated.div
					key={key}
					style={{
						position: "absolute",
						...props,
					}}
				>
					<b className={$.title}>{title}</b>
					<b className={$.subtitle}>{subtitle}</b>
				</animated.div>
			))}

			{transitionIndex.map(({ props }, key) => (
				<animated.div
					key={key}
					className={$.index}
					style={{
						position: "absolute",
						...props,
					}}
				>
					{formattedIndex}
				</animated.div>
			))}
		</b>
	);
};
