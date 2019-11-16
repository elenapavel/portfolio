import React from "react";
import $ from "./style.css";

export default ({ text, position }) => {
	if (text != null) {
		let tooltipClass = null;

		switch (position) {
			case "bottom":
				tooltipClass = `${$.tooltip_arrow_bottom}`;
				break;
			case "left":
				tooltipClass = `${$.tooltip_arrow_left}`;
				break;
			case "right":
				tooltipClass = `${$.tooltip_arrow_right}`;
				break;
			default:
				tooltipClass = `${$.tooltip_arrow_top}`;
		}

		return (
			<b className={$.tooltip}>
				{text}
				<b className={tooltipClass} />
			</b>
		);
	} else return null;
};
