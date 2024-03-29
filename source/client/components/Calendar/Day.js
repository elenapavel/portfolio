import React from "react";
import { getDate, isWeekend } from "date-fns";
import $, { css } from "./style.css";

export default ({ date, type, onSelect, onRender }) => {
	const className = $[`day_${type}`];
	const dayOfMonth = getDate(date);
	const isWeekendDay = isWeekend(date);
	const styles = {
		backgroundColor: isWeekendDay ? "rgba(0,0,0,0.1)" : "transparent",
	};
	const onClick = () =>
		typeof onSelect === "function"
			? onSelect(date, dayOfMonth, type)
			: null;

	if (typeof onRender === "function") {
		var content = onRender({ date, type, dayOfMonth });
	}

	if (!content) {
		var content = dayOfMonth;
	}

	return (
		<div className={className} onClick={onClick} style={{ ...styles }}>
			{content}
		</div>
	);
};
