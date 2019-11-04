import { isString } from "@nore/std/assert";

export default function reducer(previous, action) {
	const command = isString(action) ? action : action.type;
	const state = { ...previous };

	switch (command) {
		case "setView":
			const view = action.view;

			if (view == "myAccount") {
				state.view = view;
				state.displayedBooks = state.completedOrders;
			} else {
				state.view = state.sections[state.selectedSectionIndex].view;
				state.displayedBooks =
					view == "orders" ? state.pendingOrders : [];
			}

			break;

		case "selectSection":
			state.selectedSectionIndex = action.sectionIndex;
			break;

		case "selectCategory":
			const categoryIndex = action.categoryIndex;

			state.selectedCategoryIndex = categoryIndex;
			state.displayedBooks = [];
			state.books.forEach(book => {
				if (book.categories.includes(categoryIndex)) {
					const newBook = { ...book };
					newBook.color = state.categories[categoryIndex].color[1];
					state.displayedBooks.push(newBook);
				}
			});
			break;

		case "manageOrders":
			const bookIndex = action.bookIndex;
			const orderedBook = state.displayedBooks[bookIndex];
			const confirmedBook = state.pendingOrders[bookIndex];

			const pendingOrderIndex = state.pendingOrders.indexOf(orderedBook);
			const completedOrderIndex = state.completedOrders.indexOf(
				orderedBook
			);

			if (state.view == "library") {
				if (
					pendingOrderIndex == -1 ||
					state.pendingOrders[pendingOrderIndex].color !=
						orderedBook.color
				) {
					state.pendingOrders.push(orderedBook);
				} else {
					state.pendingOrders.splice(pendingOrderIndex, 1);
				}
			} else if (state.view == "orders") {
				if (
					completedOrderIndex == -1 ||
					state.completedOrders[completedOrderIndex].color !=
						state.pendingOrders[bookIndex].color
				) {
					state.completedOrders.push(state.pendingOrders[bookIndex]);
					state.pendingOrders.splice(bookIndex, 1);
				} else {
					state.completedOrders.splice(completedOrderIndex, 1);
				}
			} else if (state.view == "myAccount") {
				state.completedOrders.splice(bookIndex, 1);
			}
			break;

		default:
			throw Error("Website: action not found.");
	}

	return state;
}
