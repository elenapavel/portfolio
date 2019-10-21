import React from "react";
import $, { css } from "./style.css";

export default ({ heading, items }) => (
	<b className={$.container}>
		<b className={$.items}>
			{items.map((item, key) => (
				<b className={$.item} key={key}>
					<b
						className={$.blur}
						style={{
							backgroundImage: `url(${item.icon})`,
						}}
					/>
					<b className={$.content}>
						<b className={$.item_heading}>{item.heading}</b>
						<b className={$.item_subheading}>{item.subheading}</b>
					</b>
				</b>
			))}
		</b>
	</b>
);
