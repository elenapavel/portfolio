import React from "react";
import Section from "./Section";
import $ from "./style.css";

export default ({ data, heading = null }) => (
	<b className={$.featured}>
		<b className={$.heading}>{heading || data.heading}</b>
		<b className={$.content}>
			<b className={$.to_left}>
				{data.items.map((section, key) => {
					if (key < parseInt(data.items.length / 2)) {
						return (
							<Section
								key={key}
								position="right"
								heading={section.heading}
								description={section.description}
								icon={section.icon}
							/>
						);
					} else {
						return null;
					}
				})}
			</b>
			<b className={$.to_center}>
				{data.items.map((section, key) => {
					if (key >= parseInt(data.items.length / 2)) {
						return (
							<Section
								key={key}
								position="left"
								heading={section.heading}
								description={section.description}
								icon={section.icon}
							/>
						);
					} else {
						return null;
					}
				})}
			</b>
			<b className={$.to_right}>
				<b
					className={$.content_preview}
					style={{ backgroundImage: `url(${data.previewImageSrc})` }}
				/>
			</b>
		</b>
	</b>
);
