import React from "react";
import $, { css } from "./style.css";

export default ({ heading, image }) => (
	<b className={$.container} style={{ backgroundImage: `url(${image})` }}>
		<b className={$.gradient} />
		<b className={$.heading}>{heading}</b>
	</b>
);
