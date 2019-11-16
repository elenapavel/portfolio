import React from "react";
import { Link } from "@nore/pwa";
import SocialLinks from "./SocialLinks";
import $ from "./style.css";

export default ({ data }) => (
	<b className={$.section}>
		<b className={$.content}>
			{data.columns.map((column, key) => (
				<b className={$.column} key={key}>
					<b className={$.heading}>{column.heading}</b>
					<b className={$.column_content}>
						{column.type == "menu" ? (
							<b className={$.menu_items}>
								{column.items.map((item, index) => (
									<b className={$.menu_item} key={index}>
										<Link
											to={item.link}
											label={item.name}
										/>
									</b>
								))}
							</b>
						) : column.type == "address" ? (
							<b className={$.contact}>
								{column.items.email != null ? (
									<b className={$.email}>
										<Link
											to={`mailto:${column.items.email}`}
											label={column.items.email}
										/>
									</b>
								) : null}
								{column.items.address != null ? (
									<b className={$.address}>
										{column.items.address}
									</b>
								) : null}
								{column.items.phone != null ? (
									<b className={$.phone}>
										<Link
											to={`tel:${column.items.phone}`}
											label={column.items.phone}
										/>
									</b>
								) : null}
							</b>
						) : column.type == "social" ? (
							<b className={$.social_media}>
								<SocialLinks items={column.items} />
							</b>
						) : null}
					</b>
				</b>
			))}
		</b>
		<b className={$.separator} />
		<b className={$.to_bottom}>
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
				<b className={$.copyright}>{data.copyright}</b>
			</b>
		</b>
	</b>
);
