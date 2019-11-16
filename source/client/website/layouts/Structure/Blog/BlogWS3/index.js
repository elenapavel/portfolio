import React from "react";
import Button from "./Button";
import $ from "./style.css";

export default ({ data }) => (
	<b className={$.section}>
		<b className={$.content}>
			<b className={$.to_left}>
				<b className={$.tagline}>{data.tagline}</b>
				<b className={$.heading}>{data.heading}</b>
				<b className={$.description}>{data.description}</b>
				<i className={$.action}>
					<Button />
				</i>
			</b>
			<b className={$.to_right}>
				<b className={$.content}>{data.content}</b>
				<b className={$.extra}>{data.extra}</b>
			</b>
		</b>
	</b>
);
