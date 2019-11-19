import React from "react";
import Button from "./Button";
import $ from "./style.css";

export default ({ data }) => (
	<b className={$.section}>
		<b className={$.content}>
			<b className={$.heading}>{data.heading}</b>
			<b className={$.description}>{data.description}</b>
			<i className={$.action}>
				<Button label={data.actionText} />
			</i>
			<b className={$.tagline}>{data.tagline}</b>
		</b>
	</b>
);
