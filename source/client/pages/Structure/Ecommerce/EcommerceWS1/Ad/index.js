import React from "react";
import { Link } from "@nore/pwa";
import Button from "./Button";
import $ from "./style.css";

export default ({ heading, subheading, link }) => (
	<b className={$.section}>
		<b className={$.heading}>{heading}</b>
		<b className={$.subheading}>{subheading}</b>
		<i className={$.action}>
			<Link to={link}>
				<Button label="Read more" />
			</Link>
		</i>
	</b>
);
