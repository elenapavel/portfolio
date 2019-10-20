import React, { useState } from "react";
import { Title, Link } from "@nore/pwa";
import HTML from "~/components/HTML";
import Header from "$website/components/Header";
import Footer from "$website/components/Footer";
import $, { css } from "./style.css";

export default ({ page }) => (
	<b class={$.container}>
		<Header />

		<b class={$.content}>
			<Title class={$.title}>{page.title}</Title>

			<b class={$.info}>
				<HTML>{page.data.info}</HTML>
			</b>

			<b class={$.registration}>
				<HTML>{page.data.registrationMessage}</HTML>

				<Link
					newtab
					to={page.data.registrationLink}
					label="Formular de înscriere"
					class={$.registration_link}
				/>
			</b>
		</b>

		<Footer>{page.data.footer}</Footer>
	</b>
);
