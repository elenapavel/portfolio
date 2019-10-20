import React, { useState, useEffect } from "react";
import { Title } from "@nore/pwa";
import Header from "$website/components/Header";
import Footer from "$website/components/Footer";
import $, { css } from "./style.css";

import __404Robot from "assets/images/404_robot.png";

export default function NotFound() {
	return (
		<b class={$.container}>
			<Header />

			<b class={$.message}>
				<b class={$.message_image}>
					<img src={__404Robot} />
				</b>
				<b class={$.message_text}>
					<Title>Pagina nu a fost găsită</Title>
				</b>
			</b>

			<Footer />
		</b>
	);
}
