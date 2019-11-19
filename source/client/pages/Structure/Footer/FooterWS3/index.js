import React from "react";
import { Link } from "@nore/pwa";
import $ from "./style.css";

export default ({ data }) => (
	<b className={$.section}>
		<b className={$.content}>
			<b className={$.to_left}>
				{data.menu.length ? (
					<b className={$.menu}>
						{data.menu.map((item, key) => (
							<b className={$.item} key={key}>
								<Link to={item.link} label={item.name} />
							</b>
						))}
					</b>
				) : null}
			</b>
			<b className={$.to_right}>
				<b className={$.get_platform}>
					<Link to={data.getPlatform.link}>
						<b className={$.get_platform_text}>
							{data.getPlatform.text}
							<i className={$.platform_preview} />
						</b>
					</Link>
				</b>
			</b>
			<b className={$.separator} />
			<b className={$.to_bottom}>
				<b className={$.copyright}>{data.copyright}</b>
			</b>
		</b>
	</b>
);
