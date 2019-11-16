import React from "react";
import Article from "./Article";
import $ from "./style.css";

const components = {
	featured: Article,
	block: Article,
};

export default ({ data, heading = null }) => {
	let i = 0;

	return (
		<b className={$.section}>
			<b className={$.heading}>{heading || data.heading}</b>
			<b className={$.content}>
				<b className={$.to_left}>
					{data.items.map((item, key) => {
						const Component = components[item.type];

						if (item.type == "featured") {
							return (
								<b className={$.featured} key={key}>
									<Component {...item} />
								</b>
							);
						}
					})}
				</b>
				<b className={$.to_right}>
					{data.items.map((item, key) => {
						const Component = components[item.type];
						const hasMoreThanFourElements = i >= 4;

						if (!hasMoreThanFourElements)
							if (item.type == "block") {
								i++;
								return (
									<b className={$.block} key={key}>
										<Component {...item} isCollapsed />
									</b>
								);
							} else return null;
					})}
				</b>

				<b className={$.to_bottom}>
					{data.items.slice(5).map((item, key) => {
						const Component = components[item.type];

						if (item.type == "block") {
							i++;
							return (
								<b className={$.block} key={key}>
									<Component {...item} isCollapsed />
								</b>
							);
						}
					})}
				</b>
			</b>
		</b>
	);
};
