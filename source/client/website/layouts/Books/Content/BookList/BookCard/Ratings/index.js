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
			<b
				key={i}
				className={`${$.star} ${$.checked} ion-ios-star`}
				data-color={color}
			/>
		);
	}

	if (5 - fullStarNumber > 0) {
		if (partialStar != 0) {
			stars.push(
				<b
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
			<b
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
		<b className={ratingsClasses}>
			{isExpanded ? <b className={$.stars}>{stars}</b> : null}
			{score}
		</b>
	);
};
