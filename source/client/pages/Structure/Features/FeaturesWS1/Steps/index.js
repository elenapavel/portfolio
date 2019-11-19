import React from "react";
import $ from "./style.css";

export default ({ items }) => (
	<b className={$.items}>
		{items.map((item, key) => (
			<b className={$.item} key={key}>
				<b className={$.index}>{key + 1}</b>
				<b className={$.heading}>{item.heading}</b>
				<b className={$.description}>{item.description}</b>
			</b>
		))}
		<b className={$.separator} />
	</b>
);
