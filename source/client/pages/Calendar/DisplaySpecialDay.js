import React from "react";

import { isSameDay } from "date-fns";

import $, { css } from "./style.css";

export default ({ date, title, specialDates }) => {
	let hasEvents = false;
	specialDates.map((specialDate, key) => {
		if (isSameDay(date, new Date(specialDate.date))) {
			hasEvents = true;
		}
	});

	return (
		<b>
			{hasEvents ? <b className={$.title}>{title}</b> : null}
			{specialDates.map((specialDate, key) => {
				if (isSameDay(date, new Date(specialDate.date))) {
					return (
						<b
							key={key}
							style={{
								color: `${
									specialDate.type == "holiday"
										? "red"
										: specialDate.type == "event"
										? "green"
										: specialDate.type == "reminder"
										? "orange"
										: "transparent"
								}`,
								fontWeight: "bold",
							}}
						>
							{specialDate.name}
						</b>
					);
				}
			})}
		</b>
	);
};
