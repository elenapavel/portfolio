import React from "react";

import $ from "./style.css";

export default ({ onSelect = () => {} }) => (
	<div
		className={`${$.action_close} ion-android-close`}
		onClick={() => onSelect()}
	/>
);
