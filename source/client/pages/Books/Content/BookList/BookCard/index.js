import React, { useState } from "react";
import Actions from "./Actions";
import Ratings from "./Ratings";

import $, { css } from "./style.css";

export default ({
	title,
	authors,
	ratings,
	bookImage,
	content,
	color,
	index,
}) => {
	const [state, setCardState] = useState("initial");

	let cardClasses = `book-${index} ${$.container}`;

	switch (state) {
		case "expanded":
			cardClasses += ` ${$.is_expanded}`;
			break;
		case "collpased":
			cardClasses += ` ${$.is_collapsed}`;
			break;
		default:
			cardClasses += ` ${$.is_initial}`;
	}

	return (
		<b className={cardClasses}>
			<style>{`.book-${index} {
				--data_color: ${color};
			}`}</style>
			<b className={$.top_side}>
				<b className={$.book_image}>
					<img src={bookImage} />
				</b>

				<b className={$.book_details}>
					<b
						className={$.title}
						onClick={e =>
							setCardState(
								state == "expanded" ? "collpased" : "expanded"
							)
						}
					>
						{title}
					</b>

					<b className={$.authors}>
						{authors.map((author, key) => (
							<b key={key} className={$.author}>
								{author}
							</b>
						))}
					</b>

					<Ratings
						isExpanded={state == "expanded"}
						score={ratings}
						color={color}
					/>
				</b>
			</b>

			<b className={$.content}>{content}</b>

			<Actions
				bookIndex={index}
				isExpanded={state == "expanded"}
				color={color}
			/>
		</b>
	);
};
