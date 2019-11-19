import React, { useContext } from "react";

import { BooksState, BooksDispatch } from "~/client/pages/Books";

import $, { css } from "./style.css";

export default ({ items, activeIndex }) => {
	const dispatch = useContext(BooksDispatch);
	const state = useContext(BooksState);

	return (
		<b className={$.container}>
			{items.map((item, key) => {
				const tabClasses = `${$.tab} ${activeIndex == key ? $.active : ""}`;
				return (
					<b key={key}>
						<b
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
							<b className={$.tab_label}>{item.label}</b>
						</b>
					</b>
				);
			})}
		</b>
	);
};
