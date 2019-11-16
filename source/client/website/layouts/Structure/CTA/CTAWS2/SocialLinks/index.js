import React, { useState } from "react";
import { Link } from "@nore/pwa";
import Tooltip from "./Tooltip";
import $ from "./style.css";

export default ({ items }) => {
	const [elementWithVisibleTooltip, setState] = useState(null);

	const platforms = Object.keys(items);

	return (
		<b className={$.items}>
			{platforms.map((platform, key) => {
				let iconClass = null;

				switch (platform) {
					case "facebook":
						iconClass = "ion-social-facebook";
						break;
					case "twitter":
						iconClass = "ion-social-twitter";
						break;
					case "googlePlus":
						iconClass = "ion-social-googleplus";
						break;
					case "instagram":
						iconClass = "ion-social-instagram-outline";
						break;
					default:
						iconClass = key;
				}

				if (typeof iconClass === "number") {
					const errorIconClasses = `${$.error_icon} ion-help`;

					let errorClass = `${$.error_tooltip_hidden}`;

					if (elementWithVisibleTooltip != null)
						errorClass = `${$.error_tooltip_visible}`;

					return (
						<b
							className={$.error}
							key={key}
							onMouseEnter={() => setState(key)}
							onMouseLeave={() => setState(null)}
						>
							<b className={errorIconClasses} />
							<b className={errorClass}>
								<Tooltip
									text={`Icon for ${
										platforms[iconClass]
									} not found`}
								/>
							</b>
						</b>
					);
				} else {
					return (
						<b className={$.item} key={key}>
							<Link to={items[platform]}>
								<b className={iconClass} />
							</Link>
						</b>
					);
				}
			})}
		</b>
	);
};
