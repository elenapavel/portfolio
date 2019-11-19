import React from "react";
import $ from "./style.css";

export default ({ heading = null }) => {
	const actionClass = `${$.register_action} ion-android-add`;

	return (
		<b className={$.register}>
			<b className={actionClass} />
			<b className={$.register_heading}>{heading || "Join the team"}</b>
		</b>
	);
};
