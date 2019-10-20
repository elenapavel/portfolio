import React, { Component } from "react";
import { Link, Scope, loadable } from "@nore/pwa";
import $, { css } from "./style.css";

const Colors = loadable(() => import("./Colors"));
const Buttons = loadable(() => import("./Buttons"));
const HTML = loadable(() => import("./HTML"));

const menu = [
	{ header: "Design" },
	{ to: "colors", label: "Colors" },
	{ to: "html", label: "HTML" },

	{ header: "Components" },
	{ to: "buttons", label: "Buttons" },
];

export default ({ scope }) => (
	<b class={$.container}>
		<b class={$.sidebar}>
			<Link to="/">
				<b class={$.logo}>Ryota Design</b>
			</Link>

			<b class={$.menu}>
				{menu.map((item, key) => {
					if (item.header) {
						return (
							<b key={key} class={$.menu_header}>
								{item.header}
							</b>
						);
					}

					const isActive = scope.route.includes(item.to);
					const classes = css("menu_item", { is_active: isActive });

					return (
						<Link key={key} to={item.to} label={item.label} class={classes} />
					);
				})}
			</b>
		</b>
		<b class={$.content}>
			<Scope match="colors" render={Colors} />
			<Scope match="buttons" render={Buttons} />
			<Scope match="html" render={HTML} />
		</b>
	</b>
);
