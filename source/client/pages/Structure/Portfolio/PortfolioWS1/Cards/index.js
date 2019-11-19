import React from "react";
import { Link } from "@nore/pwa";
import $ from "./style.css";

export default ({ items }) => (
	<b className={$.items}>
		{items.map((item, key) => (
			<b className={$.item} key={key}>
				<Link to={item.link}>
					<b
						className={$.image}
						style={{ backgroundImage: `url(${item.image})` }}
					/>
					<b className={$.content}>
						<b className={$.heading}>{item.heading}</b>
						<b className={$.description}>{item.description}</b>
					</b>
				</Link>
			</b>
		))}
	</b>
);
