import React, { useContext, useRef } from "react";
import { State, Dispatch } from "$website";
import Menu from "./Menu.js";
import $, { css } from "./style.css";

import MenuIcon from "assets/icons/feather/menu.svg?inline";
import CloseIcon from "assets/icons/feather/x.svg?inline";

export default function Navigation(attrs) {
	const dispatch = useContext(Dispatch);
	const state = useContext(State);

	const { isVisible, isMobile } = state.navigation;
	const onClick = () => dispatch("navigation.close");

	return (
		<>
			{!isMobile ? null : (
				<>
					<b
						class={$.menu_toggle}
						onClick={() => dispatch("navigation.toggle")}
					>
						{isVisible ? <CloseIcon /> : <MenuIcon />}
					</b>
					{!isVisible ? null : <b class={$.overlay}></b>}
				</>
			)}

			<Menu items={attrs.items} />
		</>
	);
}
