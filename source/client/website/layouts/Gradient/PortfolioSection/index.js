import React from "react";
import { Link } from "@nore/pwa";
import $, { css } from "./style.css";

export default ({ heading, items }) => (
	<b className={$.container}>
		<i className={$.heading}>{heading}</i>
		<b className={$.items}>
			{items.map((item, key) => (
				<b className={$.item} key={key}>
					<b
						className={$.preview}
						style={{
							backgroundImage: `url(${item.image})`,
						}}
					/>
					<b className={$.gradient} />
					<b className={$.content}>
						<Link
							className={$.item_heading}
							to={item.link}
							label={item.heading}
						/>
					</b>
				</b>
			))}
		</b>
	</b>
);
