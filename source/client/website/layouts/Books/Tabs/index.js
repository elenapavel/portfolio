import React, { useContext } from "react";

import { BooksState, BooksDispatch } from "$website/layouts/Books";

import $, { css } from "./style.css";

export default ({ items, activeIndex }) => {
	const dispatch = useContext(BooksDispatch);
	const state = useContext(BooksState);

	return (
		<div className={$.container}>
			{items.map((item, key) => {
				const tabClasses = `${$.tab} ${
					activeIndex == key ? $.active : ""
				}`;
				return (
					<div key={key}>
						<div
							className={tabClasses}
							onClick={() => {
								dispatch({
									type: "selectSection",
									sectionIndex: key,
								});
								dispatch({
									type: "setView",
									view: item.view,
								});
							}}
						>
							<div className={$.tab_label}>{item.label}</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};
