import React, { useState } from "react";
import { Link } from "@nore/pwa";
import $ from "./style.css";

export default ({ isMenuOpened = false, onChange = () => {}, items }) => {
	const [menuState, toggleMenu] = useState(isMenuOpened);

	const menuIconClasses = `${$.menu_icon} ion-navicon`;
	const menuClasses = `${menuState ? $.menu_expanded : $.menu_collapsed}`;

	return (
		<b className={$.menu}>
			<b
				className={menuIconClasses}
				onClick={() => {
					toggleMenu(!menuState);
					onChange(!menuState);
				}}
			/>
			<b className={menuClasses}>
				{items.map((item, key) => (
					<b className={$.item} key={key}>
						<Link to={item.link} label={item.name} />
					</b>
				))}
			</b>
		</b>
	);
};
