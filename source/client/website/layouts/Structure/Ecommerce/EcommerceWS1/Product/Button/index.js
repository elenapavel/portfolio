import React from "react";
import $ from "./style.css";

export default ({ Button, onSelect = () => {} }) => (
	<b className={$.register} onClick={() => onSelect()}>
		{Button || "Register"}
	</b>
);
