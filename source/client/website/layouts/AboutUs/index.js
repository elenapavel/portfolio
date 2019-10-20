import React, { useState } from "react";
import { Link, Title } from "@nore/pwa";
import HTML from "~/components/HTML";
import Header from "$website/components/Header";
import Footer from "$website/components/Footer";
import $, { css } from "./style.css";

import __header from "assets/images/page_about_header.jpg";
import __workshop from "assets/images/page_about_workshop.jpg";

function fmtQuoteAuthor(author) {
	return author
		.split(",")
		.map((text, i) => (i === 0 ? <strong key={i}>{text},</strong> : text));
}

export default ({ page }) => (
	<b class={$.container}>
		<Title hidden>Despre noi</Title>
		<Header />

		<b class={$.content}>
			<b class={$.header}>
				<img src={__header} />
			</b>

			<b class={$.title}>{page.data.title}</b>

			<b class={$.quote}>{page.data.quote}</b>
			{!page.data.quoteAuthor ? null : (
				<b class={$.quote_cite}>
					— {fmtQuoteAuthor(page.data.quoteAuthor)}
				</b>
			)}

			<b class={$.about}>
				<HTML>{page.data.info}</HTML>
			</b>

			<b class={$.promo}>
				{page.data.promos.map((promo, key) =>
					promo.link ? (
						<Link to={promo.link} key={key}>
							<HTML>{promo.content}</HTML>
						</Link>
					) : (
						<HTML key={key}>{promo.content}</HTML>
					)
				)}
			</b>

			<b class={$.slider}>
				<b class={$.image}>
					<img src={__workshop} />
				</b>
			</b>
		</b>

		<Footer>{page.data.footer}</Footer>
	</b>
);
