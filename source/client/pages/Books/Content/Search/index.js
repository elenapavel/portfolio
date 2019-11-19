import React from "react";

import $, { css } from "./style.css";

export default () => {
	const searchAction = `${$.action_search} ion-ios-search-strong`;

	return (
		<b className={$.container}>
			<input type="text" placeholder="Type book name or author" />
			<b className={searchAction} />
		</b>
	);
};
