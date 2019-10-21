import React, { useContext } from "react";
import { Link } from "@nore/pwa";
import Navigation from "$website/components/Navigation";
import $, { css } from "./style.css";

const menu = [{ to: "/servicii", label: "Servicii" }];

export default function Header(attrs) {
	return (
		<b class={css("container", attrs.className)}>
			<Link class={$.logo} to="/" label="Portfolio" />

			<Navigation items={menu} />
		</b>
	);
}
