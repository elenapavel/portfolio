import React from "react";
import { Link } from "@nore/pwa";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";
import $, { css } from "./style.css";

export default ({ data }) => (
	<b className={$.section}>
		<b className={$.content}>
			<b className={$.logo}>
				<Logo image={data.logo} />
			</b>
			<b className={$.copyright}>{data.copyright}</b>
			<b className={$.contact}>
				{data.contact.phone != null ? (
					<i className={$.phone}>
						<Link
							to={`tel:${data.contact.phone}`}
							label={data.contact.phone}
						/>
					</i>
				) : null}
				{data.contact.address != null ? (
					<i className={$.address}>{data.contact.address}</i>
				) : null}
			</b>
			{data.social != null ? (
				<b className={$.social_media}>
					<SocialLinks items={data.social} />
				</b>
			) : null}
		</b>
	</b>
);
