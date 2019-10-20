import React, { useContext } from "react";
import { Slot } from "@nore/pwa";
import Panel from "../";
import $, { css } from "./style.css";

import MenuIcon from "assets/icons/feather/menu.svg?inline";
import CloseIcon from "assets/icons/feather/x.svg?inline";

export default function Bar(attrs) {
	const dispatch = useContext(Panel.Dispatch);
	const state = useContext(Panel.State);

	return (
		<b class={$.container}>
			<b class={$.actions}>
				<b class={$.menu} onClick={() => dispatch("navigation.toggle")}>
					{state.bar.menu.isActive ? (
						<CloseIcon class={$.menu_icon} />
					) : (
						<MenuIcon class={$.menu_icon} />
					)}
				</b>
			</b>
			<b class={$.content}>
				<Slot name="panel.bar" />
			</b>
			<b class={$.actions}>
				<Slot name="panel.bar.actions" />
			</b>
		</b>
	);
}
