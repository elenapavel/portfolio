import React from "react";
import { Link } from "@nore/pwa";
import $ from "./style.css";

export default ({ data }) => (
	<b className={$.section}>
		<b className={$.content}>
			{data.items.map((item, key) => (
				<b className={$.item} key={key}>
					<b className={$.icon} />
					<b className={$.details}>
						<b className={$.heading}>{item.heading}</b>
						<b className={$.description}>{item.description}</b>
						<b className={$.action}>
							<Link to={item.link}>
								<b className={$.tagline}>
									{item.tagline}
									<i className={$.action_icon} />
								</b>
							</Link>
						</b>
					</b>
				</b>
			))}
		</b>
	</b>
);
