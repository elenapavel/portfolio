import React, { useState, useEffect } from "react";
import { Title } from "@nore/pwa";
import $, { css } from "./style.css";

export default function NotFound() {
	return (
		<b class={$.container}>
			<b class={$.message}>
				<b class={$.message_text}>
					<Title>Pagina nu a fost găsită</Title>
				</b>
			</b>
		</b>
	);
}
