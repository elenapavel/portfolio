import React from "react";
import $ from "./style.css";

export default ({ image }) => (
	<b className={$.logo}>
		<img src={image} />
	</b>
);
