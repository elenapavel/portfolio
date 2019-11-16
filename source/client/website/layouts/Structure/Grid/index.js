import React from "react";
import Gallery from "./Gallery";
import $ from "./style.css";

export default ({ data, title = null }) => (
	<b className={$.section}>
		<b className={$.heading}>{title || data.heading}</b>
		<Gallery items={data.items} />
	</b>
);
