import React, { useState } from "react";
import { Slot, Link } from "@nore/pwa";
import Button from "~/components/Button";
import samples from "./samples.js";
import $, { css } from "./style.css";

import Plus from "assets/icons/feather/plus.svg?inline";

function Entry(attrs) {
	return (
		<Link to={`edit?id=${attrs.id}`}>
			<b class={$.entry}>{attrs.title}</b>
		</Link>
	);
}

export default function List(attrs) {
	return (
		<b class={$.container}>
			<Slot.Portal to="panel.bar">
				<b class={$.bar_title}>Articles</b>
			</Slot.Portal>

			{samples.map((entry, key) => (
				<Entry {...entry} key={key} />
			))}

			<b class={$.actions}>
				<Button type="raised" size="large" shape="circle" label={<Plus />} />
			</b>
		</b>
	);
}
