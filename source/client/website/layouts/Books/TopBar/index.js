import React, { useContext } from "react";

import { BooksState, BooksDispatch } from "$website/layouts/Books";

import $, { css } from "./style.css";

export default ({ isAccountView, logo, user, section }) => {
	const dispatch = useContext(BooksDispatch);
	const state = useContext(BooksState);

	const actionBackClasses = `${$.action_back} ion-arrow-left-c`;

	return (
		<b className={$.container}>
			<b className={$.to_left}>
				{isAccountView ? (
					<b
						className={actionBackClasses}
						onClick={() => dispatch({ type: "setView" })}
					/>
				) : null}
			</b>
			<b className={$.to_center}>
				{isAccountView ? null : (
					<b className={$.logo}>
						<img src={logo} />
					</b>
				)}
				<b className={isAccountView ? $.main_section : $.section}>
					{section}
				</b>
			</b>
			<b className={$.to_right}>
				{isAccountView ? null : (
					<b
						className={$.user_avatar}
						onClick={() =>
							dispatch({ type: "setView", view: "myAccount" })
						}
					>
						<img src={user.avatar} />
					</b>
				)}
			</b>
		</b>
	);
};
