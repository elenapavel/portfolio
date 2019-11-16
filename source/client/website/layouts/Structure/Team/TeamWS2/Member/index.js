import React from "react";
import $ from "./style.css";

export default ({ avatar, name, position }) => (
	<b className={$.section}>
		<b className={$.avatar} style={{ backgroundImage: `url(${avatar})` }} />
		<b className={$.name}>{name}</b>
		<b className={$.position}>{position}</b>
	</b>
);
