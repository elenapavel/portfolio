import React, { useState } from "react";
import Logo from "./Logo";
import Menu from "./Menu";
import Button from "./Button";
import Search from "./Search";
import $ from "./style.css";

export default ({ data }) => {
	const [isMenuOpened, toggleMenu] = useState(false);
	const [isSearchVisible, toggleSearch] = useState(false);

	const searchClass = `${
		isSearchVisible ? $.search_expanded : $.search_collapsed
	}`;

	return (
		<b className={$.platform_promo}>
			<b className={$.header}>
				<b className={$.logo}>
					<Logo image={data.logo} />
				</b>
				<b className={$.to_right}>
					<b className={searchClass}>
						<Search
							isSearchVisible={isSearchVisible}
							onChange={isSearchVisible => {
								toggleSearch(isSearchVisible);
								toggleMenu(false);
							}}
						/>
					</b>
					<b className={$.register}>
						<Button />
					</b>
				</b>
				<b className={$.menu}>
					<Menu
						isMenuOpened={isMenuOpened}
						items={data.items}
						onChange={isMenuOpened => {
							toggleMenu(isMenuOpened);
							toggleSearch(false);
						}}
					/>
				</b>
			</b>
		</b>
	);
};
