import React, { useState } from "react";
import { Title, Link } from "@nore/pwa";
import Header from "$website/components/Header";
import Footer from "$website/components/Footer";
import $, { css } from "./style.css";

import ArrowRight from "assets/icons/feather/arrow-right.svg?inline";

export default ({ page }) => (
	<b class={$.container}>
		<Title hidden>Servicii</Title>
		<Header />

		<b class={$.services}>
			<b class={$.intro}>Lista serviciilor disponibile:</b>

			<b class={$.list}>
				{page.data.services.map((section, key) => (
					<b class={$.section} key={key}>
						{section.link ? (
							<Link to={section.link} class={$.category_link}>
								{section.category}
								<ArrowRight />
							</Link>
						) : (
							<b class={$.category}>{section.category}</b>
						)}

						{section.items.map((item, key) => (
							<b class={$.service} key={key}>
								<b class={$.name}>{item.name}</b>
								<b class={$.time}>{item.time} min</b>
								<b class={$.price}>{item.price} lei</b>
							</b>
						))}
					</b>
				))}
			</b>
		</b>

		<Footer>{page.data.footer}</Footer>
	</b>
);
