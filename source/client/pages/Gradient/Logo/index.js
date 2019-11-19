import React from "react";
import { Link } from "@nore/pwa";
import $, { css } from "./style.css";

export default ({ image, link }) => (
	<i className={$.container}>
		<Link to={link}>
			<img src={image} />
		</Link>
	</i>
);
