import React, { useState } from "react";
import Menu from "./Menu";
import $ from "./style.css";

export default ({ isMenuOpened = false, onChange = () => {}, user, items }) => {
	const [menuState, toggleMenu] = useState(isMenuOpened);

	const menuClass = menuState ? $.menu_expanded : $.menu_collapsed;
	const dropdownIconClass = `${$.dropdown_icon} ${
		menuState ? "ion-arrow-up-b" : "ion-arrow-down-b"
	}`;

	return (
		<b className={$.account}>
			<b className={$.avatar}>
				<img src={user.avatar} />
				<b className={$.notification} />
			</b>
			<b
				className={$.account_menu}
				onClick={() => {
					toggleMenu(!menuState);
					onChange(!menuState);
				}}
			>
				<b className={$.user}>{user.name}</b>
				<b className={dropdownIconClass} />
			</b>
			<b className={menuClass}>
				<Menu items={items} />
			</b>
		</b>
	);
};
