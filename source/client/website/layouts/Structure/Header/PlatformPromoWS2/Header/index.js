import React, { useState } from "react";
import Logo from "./Logo";
import Menu from "./Menu";
import Button from "./Button";
import $ from "./style.css";

export default ({ data }) => {
	const [menuState, toggleMenu] = useState(false);

	return (
		<b className={$.platform_promo}>
			<b className={$.header}>
				<b className={$.logo}>
					<Logo image={data.logo} />
				</b>
				<b className={$.to_right}>
					<b className={$.register}>
						<Button />
					</b>
					<b className={$.menu}>
						<Menu
							isMenuOpened={menuState}
							items={data.items}
							onChange={isMenuOpened => toggleMenu(!isMenuOpened)}
						/>
					</b>
				</b>
			</b>
		</b>
	);
};
