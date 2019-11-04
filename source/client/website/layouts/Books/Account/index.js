import React from "react";

import $, { css } from "./style.css";

export default ({ items, user }) => {
	return (
		<div className={$.container}>
			<div className={$.details}>
				<div className={$.to_left}>
					<div className={$.avatar}>
						<img src={user.avatar} />
					</div>
				</div>
				<div className={$.to_right}>
					<div className={$.name}>{user.name}</div>
					<div className={$.email}>{user.email}</div>
					<div className={$.orders_number}>
						Taken books: {items.length}
					</div>
				</div>
			</div>
		</div>
	);
};
