import React, { useState } from "react";
import { isString } from "@nore/std/assert";
import { Link } from "@nore/pwa";
import HTML from "~/components/HTML";
import $, { css } from "./style.css";

import Phone from "assets/icons/feather/phone.svg?inline";
import MapPin from "assets/icons/feather/map-pin.svg?inline";

const defaultMessage = (
	<>
		Dacă tu sau cineva apropiat ție trece prin{" "}
		<strong>dezechilibru emoțional</strong>,{" "}
		<strong>dificultăți în relații</strong> sau <strong>alte provocări</strong>{" "}
		nu ezita să ne contactezi:
	</>
);

export default function Footer({ className, children }) {
	const message = !children ? (
		defaultMessage
	) : isString(children) ? (
		<HTML>{children}</HTML>
	) : (
		children
	);

	return (
		<b class={css("container", className)}>
			<b class={$.content}>
				<b class={$.getintouch}>
					{message}

					<a href="tel:+40722671948" class={$.getintouch_phone}>
						<Phone /> 0722 671948
					</a>
				</b>

				<b class={$.contact}>
					<Link to="/admin" class={$.copyright}>
						Ryota © 2019
					</Link>
					<a
						href="https://maps.google.com/maps?cid=11512578031009724796"
						target="_blank"
						class={$.address}
					>
						<MapPin />
						Str. George Enescu, nr. 10
					</a>
				</b>
			</b>
		</b>
	);
}
