import React, { useState, useEffect } from "react";
import $, { css } from "./style.css";

export default ({
	items,
	labelBackground,
	containerBackground,
	active,
	onChange,
}) => {
	const [activeTab, setActiveTab] = useState(active != null ? active : 0);

	function setActive(key) {
		setActiveTab(key);
		onChange(items[key]);
	}

	const tabs = items.map((item, key) => {
		return (
			<div
				className={$.tab}
				key={key}
				onClick={() => setActive(key)}
				style={{
					background:
						labelBackground || containerBackground || "#ccc",
				}}
			>
				{item}
			</div>
		);
	});

	return (
		<div
			className={$.tabs}
			style={{
				background: containerBackground || "#ccc",
			}}
		>
			{tabs}
		</div>
	);
};
