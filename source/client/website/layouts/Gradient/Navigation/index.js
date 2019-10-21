import React, { useState } from "react";
import $, { css } from "./style.css";

export default function Navigation({ menu, onSelect }) {
	const [activeIndex, setActiveIndex] = useState(0);
	const [hoverIndex, handleHover] = useState(null);

	function handleClick(key, value) {
		setActiveIndex(key);

		if (typeof onSelect === "function") onSelect(value);
	}

	return (
		<i className={$.container}>
			{menu.map((item, key) => (
				<i
					key={key}
					className={
						activeIndex == key
							? $.item_active
							: hoverIndex == key
							? $.item_active
							: $.item
					}
					onClick={() => handleClick(key, item.id)}
					onMouseEnter={() => handleHover(key)}
					onMouseLeave={() => handleHover(null)}
				>
					{item.name}
				</i>
			))}
		</i>
	);
}
