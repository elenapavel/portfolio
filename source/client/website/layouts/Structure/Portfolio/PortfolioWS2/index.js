import React, { useState } from "react";
import Actions from "./Actions";
import Gallery from "./Gallery";
import $ from "./style.css";

export default ({ data, heading = null }) => {
	const [active, onSelect] = useState(0);

	const items = Object.keys(data.items);
	const shownItems = data.items[items[active]];

	return (
		<b className={$.portfolio}>
			<b className={$.heading}>{heading || data.heading}</b>
			<b className={$.portfolio_actions}>
				<Actions
					items={items}
					active={active}
					onSelect={key => onSelect(key)}
				/>
			</b>
			<b className={$.portfolio_selected_content}>
				<Gallery items={shownItems} shouldFit />
			</b>
		</b>
	);
};
