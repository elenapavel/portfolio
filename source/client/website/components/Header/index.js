import React, { useContext } from "react";
import { Link } from "@nore/pwa";
import Navigation from "$website/components/Navigation";
import $, { css } from "./style.css";

const menu = [
	{ to: "/ateliere", label: "Ateliere" },
	{ to: "/cursuri", label: "Cursuri" },
	{ to: "/dezvoltare-personala", label: "Dezvoltare personală" },
	{ to: "/servicii", label: "Servicii" },
	{ to: "/despre-noi", label: "Despre noi" },
	// { to: "/contact", label: "Contact" },
];

export default function Header(attrs) {
	return (
		<b class={css("container", attrs.className)}>
			<Link class={$.logo} to="/" label="Ryota" />

			<Navigation items={menu} />
		</b>
	);
}
