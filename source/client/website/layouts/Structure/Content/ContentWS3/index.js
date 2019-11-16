import React from "react";
import Button from "./Button";
import $ from "./style.css";

export default ({ data }) => (
	<b className={$.section}>
		<b className={$.content}>
			<b
				className={$.preview}
				style={{
					backgroundImage: `url(${data.preview})`,
				}}
			/>
			<b className={$.card}>
				<b className={$.heading}>{data.heading}</b>
				<b className={$.description}>{data.description}</b>
				<i className={$.register_action}>
					<Button label="Try now" />
				</i>
			</b>
		</b>
	</b>
);
