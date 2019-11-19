import React, { useContext } from "react";
import { UniverseState, UniverseDispatch } from "~/client/pages/UniverseFacts";

import $ from "./style.css";

export default ({ isActive, backgroundImage, title, index }) => {
	const dispatch = useContext(UniverseDispatch);
	const state = useContext(UniverseState);

	const itemClasses = `${$.list_item} ${isActive ? $.list_item_active : ""}`;

	return (
		<div
			className={itemClasses}
			style={{
				backgroundImage: `url(${backgroundImage})`,
			}}
			onClick={() => dispatch({ type: "selectArticleByIndex", index: index })}
		>
			{title != null ? <div className={$.list_item_title}>{title}</div> : null}
		</div>
	);
};
