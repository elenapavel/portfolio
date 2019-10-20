import React, { useState } from "react";
import { Title, Link } from "@nore/pwa";
import HTML from "~/components/HTML";
import Header from "$website/components/Header";
import Footer from "$website/components/Footer";
import $, { css } from "./style.css";

import ArrowRight from "assets/icons/feather/arrow-right.svg?inline";

export default ({ page }) => (
	<b class={$.container}>
		<Header />

		<b class={$.content}>
			<Title class={$.title}>{page.title}</Title>

			<b class={$.info}>
				<HTML>{page.data.info}</HTML>
			</b>

			<b class={$.sections}>
				{page.data.sections.map((section, key) => (
					<b class={$.section} key={key}>
						<b class={$.section_title}>{section.category}</b>

						<b class={$.section_items}>
							{section.items.map((item, key) => (
								<Link to={item.link} class={$.section_item} key={key}>
									{item.name}
									<ArrowRight />
								</Link>
							))}
						</b>
					</b>
				))}
			</b>
		</b>

		<Footer>{page.data.footer}</Footer>
	</b>
);
