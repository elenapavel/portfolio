import React from "react";

import isSameDay from "date-fns/is_same_day";
import $, { css } from "./style.css";

export default ({ date, specialDates }) => (
	<b>
		{specialDates.map((specialDate, key) => {
			if (isSameDay(date, new Date(specialDate.date))) {
				return (
					<b
						key={key}
						style={{
							width: "100%",
							marginTop: "0.25rem",
							border: `2px solid ${
								specialDate.type == "holiday"
									? "red"
									: specialDate.type == "event"
									? "green"
									: specialDate.type == "reminder"
									? "orange"
									: "transparent"
							}`,
						}}
					/>
				);
			}
		})}
	</b>
);
