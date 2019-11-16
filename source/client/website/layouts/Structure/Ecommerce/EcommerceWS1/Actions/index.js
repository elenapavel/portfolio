import React, { Component } from "react";
import $ from "./style.css";

export default ({ items, active, onSelect = () => {} }) => (
	<b className={$.items}>
		{items != null &&
			items.length != 0 &&
			items.map((item, key) => (
				<b
					className={key == active ? $.item_active : $.item}
					key={key}
					onClick={() => onSelect(key)}
				>
					{item}
				</b>
			))}
	</b>
);
