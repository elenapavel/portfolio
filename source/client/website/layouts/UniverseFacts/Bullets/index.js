import React, { useContext } from "react";
import {
	UniverseState,
	UniverseDispatch,
} from "$website/layouts/UniverseFacts";

import $ from "./style.css";

export default () => {
	const dispatch = useContext(UniverseDispatch);
	const state = useContext(UniverseState);

	const { selectedArticleIndex, selectedCategoryArticles } = state;

	const bulletsNumber = selectedCategoryArticles.length;

	return (
		<div className={$.bullets}>
			{bulletsNumber
				? new Array(bulletsNumber).fill().map((item, key) => {
						const bulletClasses = `${$.bullet} ${
							selectedArticleIndex != null
								? selectedArticleIndex == key
									? $.bullet_active
									: ""
								: key == 0
								? $.bullet_active
								: ""
						}`;
						return (
							<div
								key={key}
								className={bulletClasses}
								onClick={() =>
									dispatch({
										type: "selectArticleByIndex",
										index: key,
									})
								}
							/>
						);
				  })
				: null}
		</div>
	);
};
