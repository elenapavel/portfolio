import React, { useState, useEffect } from "react";
import { debounce } from "@nore/std/utils";

import $, { css } from "./style.css";

const weekDaysNames = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];
const weekDaysNamesSmall = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const weekDaysNamesXSmall = ["M", "T", "W", "T", "F", "S", "S"];

export default ({ isMultipleView }) => {
	const [weekDays, setWeekDays] = useState(null);

	useEffect(initialize, []);

	function initialize() {
		const onResize = debounce(setWeekDaysName, 200);

		function setWeekDaysName() {
			setWeekDays(
				window.innerWidth > 640 && !isMultipleView
					? weekDaysNames
					: window.innerWidth > 480 && !isMultipleView
					? weekDaysNamesSmall
					: weekDaysNamesXSmall
			);
		}

		setWeekDaysName();
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}

	return (
		<div className={$.container}>
			{weekDays == null
				? null
				: weekDays.map((weekDay, key) => {
						return (
							<div key={key} className={$.week_day}>
								{weekDay}
							</div>
						);
				  })}
		</div>
	);
};
