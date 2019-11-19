import React from "react";
import { Link } from "@nore/pwa";

import $ from "./style.css";

export default ({ data }) => (
	<b className={$.section}>
		<b className={$.container}>
			<b className={$.content}>
				<b className={$.heading}>{data.heading}</b>
				<b className={$.description}>{data.description}</b>
				<b className={$.read_more_action}>
					<Link to={data.readMore.link}>
						{data.readMore.text}
						<i className={$.read_more_icon} />
					</Link>
				</b>
			</b>
			<b
				className={$.preview_image}
				style={{ backgroundImage: `url(${data.previewImage})` }}
			/>
		</b>
	</b>
);
