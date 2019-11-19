import React from "react";
import Steps from "./Steps";
import $ from "./style.css";

export default ({ data, heading = null }) => (
	<b className={$.featured}>
		<b className={$.heading}>{heading || data.heading}</b>
		<b className={$.featured_section}>
			<b className={$.featured_list}>
				<Steps items={data.features} />
			</b>
			<b
				className={$.featured_preview}
				style={{ backgroundImage: `url(${data.previewImage})` }}
			/>
		</b>
	</b>
);
