import React from "react";
import $ from "./style.css";

export default ({ label, onSelect = () => {} }) => (
	<b className={$.register} onClick={() => onSelect()}>
		{label || "Register"}
	</b>
);
