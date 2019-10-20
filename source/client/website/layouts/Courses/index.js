import React, { useState } from "react";
import { Title } from "@nore/pwa";
import Button from "~/components/Button";
import HTML from "~/components/HTML";
import Header from "$website/components/Header";
import Footer from "$website/components/Footer";
import EnrollToEvent from "$website/components/EnrollToEvent";
import $, { css } from "./style.css";

export default ({ page }) => {
	const [event, setEvent] = useState(null);

	return (
		<b class={$.container}>
			<Header />

			{!event ? null : (
				<EnrollToEvent event={event} onClose={() => setEvent(null)} />
			)}

			<b class={$.content}>
				<Title class={$.title}>{page.title}</Title>
				<HTML class={$.info}>{page.data.info}</HTML>

				<b class={$.list_title}>Cursuri disponibile:</b>
				<b class={$.list}>
					{page.data.events.map((event, index) => (
						<b class={$.list_item} key={index}>
							{event.name}

							<Button
								label="Mă înscriu"
								type="flat"
								is="primary"
								onClick={() => setEvent(event)}
							/>
						</b>
					))}
				</b>
				<b class={$.list_note}>{page.data.eventNote}</b>
			</b>

			<Footer>{page.data.footer}</Footer>
		</b>
	);
};
