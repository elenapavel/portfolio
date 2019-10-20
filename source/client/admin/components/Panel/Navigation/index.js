import React, { useContext, useRef } from "react";
import { Slot } from "@nore/pwa";
import useOnEscOrOutsideClick from "~/client/hooks/useOnEscOrOutsideClick";
import Panel from "../";
import Menu from "./Menu";
import $, { css } from "./style.css";

export default function Navigation(attrs) {
	const dispatch = useContext(Panel.Dispatch);
	const state = useContext(Panel.State);
	const ref = useRef(null);

	useOnEscOrOutsideClick(ref, state.navigation.isVisible, () => {
		dispatch("navigation.close");
	});

	const classes = css("container", {
		is_visible: state.navigation.isVisible,
		is_minimized: state.navigation.isMinimized,
	});

	return (
		<b ref={ref} class={classes}>
			<Slot name="panel.navigation.header" />
			<Slot name="panel.navigation.menu" render={Menu} />
			<Slot name="panel.navigation.company" />
			<Slot name="panel.navigation.account" />
		</b>
	);
}
