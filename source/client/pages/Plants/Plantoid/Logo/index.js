import React from "react";
import $, { css } from "./style.css";

export default ({ logo }) => (
	<b className={$.container}>
		<b className={$.logo}>
			<img src={logo} />
		</b>
	</b>
);
