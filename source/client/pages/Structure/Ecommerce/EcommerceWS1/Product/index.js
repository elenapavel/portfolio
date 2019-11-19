import React, { useState } from "react";
import { Link } from "@nore/pwa";
import Button from "./Button";
import $ from "./style.css";

export default ({
	name,
	image,
	price,
	description,
	link,
	index,
	isSelected = false,
	onSelect = () => {},
}) => {
	const [selectedState, toggleSelect] = useState(isSelected);

	const sectionClass = isSelected ? $.section_expanded : $.section_collapsed;

	return (
		<b
			className={sectionClass}
			onClick={() => {
				toggleSelect(!selectedState);
				onSelect(index);
			}}
		>
			<b
				className={$.image}
				style={{ backgroundImage: `url(${image})` }}
			/>
			<b className={$.details}>
				<b className={$.name}>{name}</b>
				<b className={$.description}>{description}</b>
				<b className={$.price}>{price}</b>
				<i className={$.action}>
					{link ? (
						<Link to={link}>
							<Button label="Buy" />
						</Link>
					) : (
						<Button label="Buy" />
					)}
				</i>
			</b>
		</b>
	);
};
