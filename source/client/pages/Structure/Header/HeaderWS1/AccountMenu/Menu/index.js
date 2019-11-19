import React from "react";
import { Link } from "@nore/pwa";
import $ from "./style.css";

export default ({ items }) => (
	<b className={$.menu}>
		{items.map((item, key) => (
			<b className={$.item} key={key}>
				<Link to={item.link} label={item.name} />
			</b>
		))}
	</b>
);
