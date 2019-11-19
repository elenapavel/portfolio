import React from "react";
import { Link } from "@nore/pwa";
import $ from "./style.css";

export default ({ heading, description, image, link, date, isCollapsed }) => (
	<b className={isCollapsed ? $.article : $.article_featured}>
		<Link to={link}>
			<b
				className={$.image}
				style={{ backgroundImage: `url(${image})` }}
			/>
		</Link>
		<b className={$.content}>
			{isCollapsed ? <b className={$.date}>{date}</b> : null}
			<Link to={link} className={$.heading} label={heading} />

			<b className={$.description}>{description}</b>
			{isCollapsed ? null : (
				<b className={$.read_more_action}>
					<Link to={link}>
						Read article
						<i className={$.read_more_icon} />
					</Link>
				</b>
			)}
		</b>
	</b>
);
