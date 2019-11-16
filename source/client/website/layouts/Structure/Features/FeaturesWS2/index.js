import React, { useState } from "react";
import Actions from "./Actions";
import Sections from "./Sections";
import $ from "./style.css";

export default ({ data, heading = null }) => {
	const [active, onSelect] = useState(0);

	const contentActive = data.content[active];

	return (
		<b className={$.featured}>
			<b className={$.heading}>{heading || data.heading}</b>
			<b className={$.actions}>
				<Actions
					items={data.items}
					active={active}
					onSelect={key => onSelect(key)}
				/>
			</b>
			<b className={$.content}>
				<Sections sections={contentActive} />
			</b>
		</b>
	);
};
