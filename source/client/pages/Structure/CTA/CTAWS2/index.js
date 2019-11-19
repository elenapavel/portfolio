import React from "react";
import SocialLinks from "./SocialLinks";
import $ from "./style.css";

export default ({ data }) => (
	<b className={$.section}>
		<b className={$.content}>
			<b className={$.heading}>{data.heading}</b>
			<b className={$.social_links}>
				<SocialLinks items={data.items} />
			</b>
		</b>
	</b>
);
