import React, { useState, useEffect } from "react";
import { Title } from "@nore/pwa";
import $, { css } from "./style.css";

import __404Robot from "$assets/images/404_robot.png";

export default function NotFound() {
	return (
		<b class={$.container}>
			<b class={$.message}>
				<b class={$.message_image}>
					<img src={__404Robot} />
				</b>
				<b class={$.message_text}>
					<Title>Pagina nu a fost găsită</Title>
				</b>
			</b>
		</b>
	);
}
