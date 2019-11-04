import React from "react";

import $, { css } from "./style.css";

export default ({ items, user }) => (
	<b className={$.container}>
		<b className={$.details}>
			<b className={$.to_left}>
				<b className={$.avatar}>
					<img src={user.avatar} />
				</b>
			</b>
			<b className={$.to_right}>
				<b className={$.name}>{user.name}</b>
				<b className={$.email}>{user.email}</b>
				<b className={$.orders_number}>Taken books: {items.length}</b>
			</b>
		</b>
	</b>
);
