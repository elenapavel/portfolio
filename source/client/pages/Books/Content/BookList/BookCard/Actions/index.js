import React, { useContext } from "react";

import { BooksState, BooksDispatch } from "~/client/pages/Books";

import $, { css } from "./style.css";

export default ({ bookIndex, isExpanded, color }) => {
	const dispatch = useContext(BooksDispatch);
	const state = useContext(BooksState);

	const actionClasses = isExpanded
		? `${$.container} ${$.is_expanded}`
		: `${$.container} ${$.is_collapsed}`;

	const {
		view,
		displayedBooks,
		selectedCategoryIndex,
		categories,
		pendingOrders,
		completedOrders,
	} = state;

	let buttonClasses = $.action_order;

	const buttonText =
		view == "library"
			? "Take book"
			: view == "orders"
			? "Confirm order"
			: view == "myAccount"
			? "Return book"
			: null;

	if (view == "library") {
		if (pendingOrders.indexOf(displayedBooks[bookIndex]) != -1) {
			buttonClasses += ` ${$.is_managed}`;
		}
	} else if (view == "orders") {
		if (completedOrders.indexOf(pendingOrders[bookIndex]) != -1) {
			buttonClasses += ` ${$.is_managed}`;
		}
	} else if (view == "myAccount") {
		if (completedOrders.indexOf(pendingOrders[bookIndex]) != -1) {
			buttonClasses += ` ${$.is_managed}`;
		}
	}

	return !buttonText ? null : (
		<b className={actionClasses}>
			<b
				className={buttonClasses}
				onClick={() =>
					dispatch({
						type: "manageOrders",
						bookIndex: bookIndex,
					})
				}
			>
				{buttonText}
				<b className={`${$.checked} ion-checkmark-round`} />
			</b>
		</b>
	);
};
