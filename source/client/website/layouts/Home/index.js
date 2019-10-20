import React, { useState, useEffect } from "react";
import { Title } from "@nore/pwa";
import HTML from "~/components/HTML";
import Header from "$website/components/Header";
import Footer from "$website/components/Footer";
import $, { css } from "./style.css";

import __decorLeft from "assets/images/home_decor_left.svg";
import __decorRight from "assets/images/home_decor_right.svg";
import __stamp_3 from "assets/images/home_stamp_3.png";
import __stamp_4 from "assets/images/home_stamp_4.png";
import __stamp_5 from "assets/images/home_stamp_5.png";
import __stamp_6 from "assets/images/home_stamp_6.png";

export default function Home({ page }) {
	return (
		<b class={$.container}>
			<Title hidden>{page.title}</Title>

			<Header />

			<b class={$.title}>
				<HTML>{page.data.title}</HTML>
			</b>
			<b class={$.subtitle}>
				<HTML>{page.data.subtitle}</HTML>
			</b>

			<b class={$.featured}>
				<b class={$.featured_text}>
					<HTML>{page.data.featured.text}</HTML>
				</b>
				<b class={$.featured_note}>
					<HTML>{page.data.featured.note}</HTML>
				</b>
			</b>

			<Footer class={$.footer}>{page.data.footer}</Footer>

			<b class={$.decor}>
				<img src={__stamp_3} class={$.stamp_3} />
				<img src={__stamp_4} class={$.stamp_4} />
				<img src={__stamp_5} class={$.stamp_5} />
				<img src={__stamp_6} class={$.stamp_6} />
				<img src={__decorLeft} class={$.decor_left} />
				<img src={__decorRight} class={$.decor_right} />
			</b>
		</b>
	);
}
