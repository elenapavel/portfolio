import React, { useState } from "react";
import { Link } from "@nore/pwa";
import data from "./data";
import $, { css } from "./style.css";

const absolutePath = IS_DEVELOPMENT ? "" : "/portfolio";

export default function Home({ page }) {
	const [hoveredItemIndex, handleHover] = useState(null);

	const arrowClasses = `${$.arrow} ion-ios-arrow-thin-right`;

	return (
		<b className={$.container}>
			<b className={$.content}>
				<b className={$.separator} />
				<b className={$.title}>Playground</b>
				<b className={$.description} />
			</b>
			<b className={$.items}>
				{data.nav.map((item, key) => {
					const itemClasses =
						hoveredItemIndex == key
							? $.item_link_hovered
							: $.item_link;

					return (
						<b key={key} className={$.item}>
							<b
								className={$.item_image}
								style={{
									backgroundImage: `url(${item.image})`,
								}}
							/>
							<b
								className={itemClasses}
								onMouseEnter={() => handleHover(key)}
								onMouseLeave={() => handleHover(null)}
							>
								<Link to={`${absolutePath}${item.link}`}>
									{item.title}
									<b className={arrowClasses} />
								</Link>
							</b>
						</b>
					);
				})}
			</b>
		</b>
	);
}