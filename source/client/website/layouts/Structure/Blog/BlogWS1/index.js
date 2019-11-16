import React from "react";
import Article from "./Article";
import $ from "./style.css";

const components = {
	featured: Article,
	block: Article,
};

export default ({ data, heading = null }) => (
	<b className={$.section}>
		<b className={$.heading}>{heading || data.heading}</b>
		<b className={$.content}>
			{data.items.map((item, key) => {
				const Component = components[item.type];

				if (item.type == "featured") {
					return (
						<b className={$.featured} key={key}>
							<b className={$.article}>
								<Component {...item} />
							</b>
						</b>
					);
				}

				if (item.type == "block") {
					return (
						<b className={$.block} key={key}>
							<b className={$.article}>
								<Component {...item} isCollapsed />
							</b>
						</b>
					);
				}

				return <b> missing component type {item.type} </b>;
			})}
		</b>
	</b>
);
