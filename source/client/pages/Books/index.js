import React, { useReducer, useEffect } from "react";
import reducer from "./reducer";

export const BooksState = React.createContext(null);
export const BooksDispatch = React.createContext(null);

import TopBar from "./TopBar";
import Account from "./Account";
import Tabs from "./Tabs";
import Content from "./Content";

import $, { css } from "./style.css";

export default ({ data }) => {
	const initialState = {
		logo: data.logo,
		books: data.books,
		sections: data.sections,
		selectedSectionIndex: 0,
		view: data.view,
		displayedBooks: [],
		user: data.user,
		pendingOrders: [],
		completedOrders: [],
		categories: data.categories,
		selectedCategoryIndex: null,
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	const {
		logo,
		user,
		selectedSectionIndex,
		view,
		sections,
		displayedBooks,
		pendingOrders,
		completedOrders,
		selectedCategoryIndex,
	} = state;

	return !state ? null : (
		<BooksDispatch.Provider value={dispatch}>
			<BooksState.Provider value={state}>
				<b className={$.application}>
					<b className={$.container}>
						<TopBar
							isAccountView={view == "myAccount"}
							user={user}
							logo={logo}
							section={
								view == "myAccount"
									? "My Account"
									: sections[selectedSectionIndex].label
							}
						/>

						{view == "myAccount" ? (
							<Account items={completedOrders} user={user} />
						) : (
							<Tabs
								items={sections}
								activeIndex={selectedSectionIndex}
							/>
						)}

						<Content
							view={view}
							books={
								view == "myAccount"
									? completedOrders
									: view == "orders"
									? pendingOrders
									: displayedBooks
							}
							label={
								selectedCategoryIndex == null
									? ""
									: view == "myAccount"
									? "Taken Books"
									: "Results"
							}
						/>
					</b>
				</b>
			</BooksState.Provider>
		</BooksDispatch.Provider>
	);
};
