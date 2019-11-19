import React from "react";
import $ from "./style.css";

export default ({ position, heading, description, icon }) => {
	const sectionIconClasses = `${$.icon} ${icon}`;

	return (
		<b className={position == "left" ? $.to_left : $.to_right}>
			<b className={sectionIconClasses} />
			<b className={$.heading}>{heading}</b>
			<b className={$.description}>{description}</b>
		</b>
	);
};
