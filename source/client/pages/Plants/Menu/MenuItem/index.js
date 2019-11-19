import React from "react";
import $, { css } from "./style.css";

export default ({ name, isSelected, index, onSelect }) => (
	<b
		className={isSelected ? $.item + " " + $.selected : $.item}
		onClick={() => onSelect(index)}
	>
		{name}
	</b>
);
