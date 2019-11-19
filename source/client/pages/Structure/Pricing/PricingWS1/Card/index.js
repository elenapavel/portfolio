import React, { useState } from "react";
import { Link } from "@nore/pwa";
import Button from "./Button";
import $ from "./style.css";

export default ({
	index,
	label,
	description,
	price,
	link,
	isSelected = false,
	onSelect = () => {},
}) => {
	const [selectedState, toggleSelect] = useState(isSelected);
	const cardClass = isSelected ? $.card_expanded : $.card_collapsed;

	return (
		<b
			className={cardClass}
			onClick={() => {
				toggleSelect(!selectedState);
				onSelect(index);
			}}
		>
			<b className={$.label}>{label}</b>
			<b className={$.icon} />
			<b className={$.description}>{description}</b>
			<b className={$.price}>{price}</b>
			<b className={$.action}>
				<Link to={link}>
					<Button label="Get plan" />
				</Link>
			</b>
		</b>
	);
};
