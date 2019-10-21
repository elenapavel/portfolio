import React from "react";
import $, { css } from "./style.css";

export default ({ items }) => (
	<div className={$.container}>
		<div className={$.to_bottom}>
			{items.map((item, key) => {
				const item_key = Object.keys(item)[0];
				const item_value = Object.values(item)[0];
				const icon_path = "/plants/social_icons/" + item_key + ".svg";
				const itemClasses = $.item + " " + $[item_key];

				return (
					<div key={key} className={itemClasses}>
						<a href={item_value}>
							<img src={icon_path} />
						</a>
					</div>
				);
			})}
		</div>
	</div>
);
