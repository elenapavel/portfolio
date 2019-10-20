import React, { useContext } from "react";
import { Scope, Slot } from "@nore/pwa";
import Panel from "$admin/components/Panel";
import Logo from "./Logo";
import menu from "./menu.js";
import $, { css } from "./style.css";

export default ({ children }) => (
	<Panel>
		<Slot.Portal to="panel.navigation.header">
			<Logo />
		</Slot.Portal>

		<Slot.Portal to="panel.navigation.menu" render={{ items: menu }} />
		<Slot.Portal to="panel.content">{children}</Slot.Portal>
	</Panel>
);
