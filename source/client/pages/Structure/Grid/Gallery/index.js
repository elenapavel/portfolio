import React from "react";
import $ from "./style.css";

export default ({ items }) => (
	<b className={$.gallery}>
		<b className={$.section}>
			{items.map((item, key) => {
				const itemClass = item.type == "default" ? $.item : $.item_wide;

				return (
					<b className={itemClass} key={key}>
						<b
							className={$.preview}
							style={{ backgroundImage: `url(${item.link})` }}
						/>
					</b>
				);
			})}
		</b>
	</b>
);
