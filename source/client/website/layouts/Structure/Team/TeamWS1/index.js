import React, { useState } from "react";
import Member from "./Member";
import $ from "./style.css";

export default ({ data, heading = null }) => {
	const [visibleMemberDetailsIndex, setState] = useState(null);

	return (
		<b className={$.section}>
			<b className={$.heading}>{heading || data.heading}</b>
			<b className={$.content}>
				{data.members.length &&
					data.members.map((item, key) => (
						<b className={$.item} key={key}>
							<Member
								areDetailsVisible={
									key == visibleMemberDetailsIndex
								}
								index={key}
								avatar={item.avatar}
								name={item.name}
								position={item.position}
								description={item.description}
								socialMedia={item.socialMedia}
								onSelect={key =>
									visibleMemberDetailsIndex == key
										? setState(null)
										: setState(key)
								}
							/>
						</b>
					))}
			</b>
		</b>
	);
};
