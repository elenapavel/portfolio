import React from "react";
import $, { css } from "./style.css";

export default ({ heading, subheading, image, description }) => (
	<b className={$.container}>
		<b className={$.content}>
			<i className={$.subheading}>{subheading}</i>
			<b className={$.heading}>{heading}</b>
			<b className={$.description}>
				<i className={$.line} />
				{description}
			</b>
			<b className={$.box} />
		</b>
		<b className={$.preview}>
			<b
				className={$.image}
				style={{ backgroundImage: `url(${image}` }}
			/>
			<b className={$.gradient} />
		</b>
	</b>
);
