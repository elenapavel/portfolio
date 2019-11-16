import React from "react";
import Cards from "./Cards";
import $ from "./style.css";

export default ({ data, heading = null }) => (
	<b className={$.portfolio}>
		<b className={$.heading}>{heading || data.heading}</b>
		<b className={$.portfolio_cards}>
			<Cards items={data.items} />
		</b>
	</b>
);
