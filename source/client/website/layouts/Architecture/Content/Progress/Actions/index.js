import React, { useContext } from "react";
import {
	ArchitectureState,
	ArchitectureDispatch,
} from "$website/layouts/Architecture";

import $, { css } from "./style.css";

export default () => {
	const dispatch = useContext(ArchitectureDispatch);
	const state = useContext(ArchitectureState);

	const { selectedArticleIndex, articles } = state;

	return (
		<div className={$.actions_container}>
			{selectedArticleIndex == 0 ? null : (
				<div
					className={$.action}
					onClick={() =>
						dispatch({
							type: "selectArticleIndex",
							index: selectedArticleIndex - 1,
						})
					}
				>
					Previous
				</div>
			)}

			{selectedArticleIndex == articles.length - 1 ? null : (
				<div
					className={$.action}
					onClick={() =>
						dispatch({
							type: "selectArticleIndex",
							index: selectedArticleIndex + 1,
						})
					}
				>
					Next
				</div>
			)}
		</div>
	);
};
