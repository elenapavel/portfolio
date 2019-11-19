import React, { useContext } from "react";
import {
	ArchitectureState,
	ArchitectureDispatch,
} from "~/client/pages/Architecture";

import $, { css } from "./style.css";

export default () => {
	const dispatch = useContext(ArchitectureDispatch);
	const state = useContext(ArchitectureState);

	const { selectedArticleIndex, articles } = state;

	return (
		<b className={$.actions_container}>
			{selectedArticleIndex == 0 ? null : (
				<b
					className={$.action}
					onClick={() =>
						dispatch({
							type: "selectArticleIndex",
							index: selectedArticleIndex - 1,
						})
					}
				>
					Previous
				</b>
			)}

			{selectedArticleIndex == articles.length - 1 ? null : (
				<b
					className={$.action}
					onClick={() =>
						dispatch({
							type: "selectArticleIndex",
							index: selectedArticleIndex + 1,
						})
					}
				>
					Next
				</b>
			)}
		</b>
	);
};
