import React, { useState } from "react";
import Logo from "./Logo";
import Menu from "./Menu";
import AccountMenu from "./AccountMenu";
import $ from "./style.css";

export default ({ data }) => {
	const [isMenuOpened, toggleMenu] = useState(false);
	const [isAccountMenuOpened, toggleAccountMenu] = useState(false);

	return (
		<b className={$.header}>
			<b className={$.logo}>
				<Logo image={data.logo} />
			</b>
			<b className={$.account}>
				<AccountMenu
					isMenuOpened={isAccountMenuOpened}
					user={data.user}
					items={data.accountMenuItems}
					onChange={isAccountMenuOpened => {
						toggleAccountMenu(isAccountMenuOpened);
						toggleMenu(false);
					}}
				/>
			</b>
			<b className={$.menu}>
				<Menu
					isMenuOpened={isMenuOpened}
					items={data.items}
					onChange={isMenuOpened => {
						toggleMenu(isMenuOpened);
						toggleAccountMenu(false);
					}}
				/>
			</b>
		</b>
	);
};
