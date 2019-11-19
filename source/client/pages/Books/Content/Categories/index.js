import React, { useContext } from "react";

import { BooksState, BooksDispatch } from "~/client/pages/Books";

import $, { css } from "./style.css";

export default () => {
	const dispatch = useContext(BooksDispatch);
	const state = useContext(BooksState);
	const { categories, selectedCategoryIndex } = state;

	return (
		<b className={$.container}>
			{categories.map((category, key) => {
				const categoryBoxShadow =
					selectedCategoryIndex == key
						? `0.5rem 2rem 5rem -2rem ${
								category.color[1]
						  }, inset 0 0 16px rgba(255, 255, 255, 0.35)`
						: `inset 0 0 16px rgba(255, 255, 255, 0.35)`;

				const iconClasses = `${$.icon} ${category.icon}`;

				return (
					<b
						key={key}
						className={$.category}
						style={{
							background: `linear-gradient(to bottom right, ${
								category.color[0]
							}, ${category.color[1]})`,
							boxShadow: `${categoryBoxShadow}`,
						}}
						onClick={() =>
							dispatch({
								type: "selectCategory",
								categoryIndex: key,
							})
						}
					>
						<b className={iconClasses} />
						<b className={$.label}>{category.label}</b>
					</b>
				);
			})}
		</b>
	);
};
