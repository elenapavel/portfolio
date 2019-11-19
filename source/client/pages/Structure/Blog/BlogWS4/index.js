import React from "react";
import Card from "./Card";
import $ from "./style.css";

export default ({ data, heading = null }) => (
	<b className={$.section}>
		<b className={$.heading}>{heading || data.heading}</b>
		<b className={$.content}>
			<b className={$.to_left}>
				<Card
					heading={data.card.heading}
					excerpt={data.card.excerpt}
					subheading={data.card.author.name}
					tagline={data.card.date}
				/>
			</b>
			<b className={$.to_right}>
				{data.sections.map((section, key) => {
					switch (section.type) {
						case "tagline":
							var sectionClass = $.tagline;
							break;
						case "paragraph":
							var sectionClass = $.paragraph;
							break;
						case "heading":
						default:
							var sectionClass = $.subheading;
					}
					return (
						<b className={sectionClass} key={key}>
							{section.content}
						</b>
					);
				})}
			</b>
		</b>
	</b>
);
