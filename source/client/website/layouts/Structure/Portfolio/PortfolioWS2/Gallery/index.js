import React from "react";
import { Link } from "@nore/pwa";
import $ from "./style.css";

export default ({ items, shouldFit }) => {
	const fullWidthItemIndex = !shouldFit
		? null
		: items.length % 2 == 0
		? null
		: items.length - 1;

	return (
		<b className={$.items}>
			{items.map((item, key) => {
				return (
					<b
						key={key}
						className={
							fullWidthItemIndex == key
								? $.item_full_width
								: $.item
						}
					>
						<b
							className={$.image}
							style={{ backgroundImage: `url(${item.image})` }}
						/>
						<b className={$.content}>
							<Link to={item.link}>
								<b className={$.heading}>{item.heading}</b>
								<b className={$.description}>
									{item.description}
								</b>
							</Link>
						</b>
					</b>
				);
			})}
		</b>
	);
};
