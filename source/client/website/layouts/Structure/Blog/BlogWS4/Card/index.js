import React from "react";
import $ from "./style.css";

export default ({ heading, excerpt, subheading, tagline }) => (
	<b className={$.section}>
		<b className={$.heading}>{heading}</b>
		<b className={$.excerpt}>{excerpt}</b>
		<b className={$.note}>
			<b className={$.subheading}>{subheading}</b>
			<b className={$.tagline}>{tagline}</b>
		</b>
	</b>
);
