import React from "react";
import SocialLinks from "./SocialLinks";
import $ from "./style.css";

export default ({
	avatar,
	name,
	position,
	description,
	socialMedia,
	index,
	onSelect = () => {},
	areDetailsVisible,
}) => {
	const memberClass = `${
		areDetailsVisible ? $.member_expanded : $.member_collapsed
	}`;

	return (
		<b className={memberClass} onClick={() => onSelect(index)}>
			<b
				className={$.avatar}
				style={{ backgroundImage: `url(${avatar})` }}
			/>
			<b className={$.details}>
				<b className={$.heading}>{name}</b>
				<b className={$.position}>{position}</b>
				<b className={$.description}>{description}</b>
				<b className={$.social_media}>
					<SocialLinks items={socialMedia} />
				</b>
			</b>
		</b>
	);
};
