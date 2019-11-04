import React from "react";
import $, { css } from "./style.css";

export default ({ isExpanded, score, color }) => {
	const fullStarNumber = parseInt(score);

	let partialStar = parseFloat(
		parseFloat(score) - parseFloat(parseInt(score))
	);

	let stars = [];

	for (let i = 0; i < fullStarNumber; i++) {
		stars.push(
			<div
				key={i}
				className={`${$.star} ${$.checked} ion-ios-star`}
				data-color={color}
			/>
		);
	}
	if (5 - fullStarNumber > 0) {
		if (partialStar != 0) {
			stars.push(
				<div
					key={fullStarNumber}
					className={`${$.star} ${$.checked} ion-ios-star-half`}
					data-color={color}
				/>
			);
		}
	}
	partialStar = partialStar != 0 ? 1 : 0;
	for (let i = 0; i < 5 - fullStarNumber - partialStar; i++) {
		stars.push(
			<div
				key={fullStarNumber + i + 1}
				className={`${$.star} ion-ios-star-outline`}
				data-color={color}
			/>
		);
	}
	const ratingsClasses = isExpanded
		? `${$.container} ${$.is_expanded}`
		: $.container;
	return (
		<div className={ratingsClasses}>
			{isExpanded ? <div className={$.stars}>{stars}</div> : null}
			{score}
		</div>
	);
};
