import { isString } from "@nore/std/assert";

export default function reducer(previous, action) {
	const command = isString(action) ? action : action.type;
	const state = { ...previous };

	let index;

	switch (command) {
		case "selectCategoryByIndex":
			index = action.index;

			state.lastSelectedCategoryIndex = state.selectedCategoryIndex;
			state.selectedCategoryIndex = index;
			state.selectedCategoryArticles = [];
			state.view = "category";
			state.menuIsOpen = false;

			state.articles.forEach(article =>
				article.category == state.categories[index].label
					? state.selectedCategoryArticles.push(article)
					: null
			);

			break;

		case "selectArticleByIndex":
			index = action.index;

			state.view = "article";
			state.lastSelectedArticleIndex = state.selectedArticleIndex;
			state.selectedArticleIndex = index;

			break;

		case "changeViewToCategory":
			state.view = "category";
			state.selectedArticleIndex = null;
			state.lastSelectedArticleIndex = null;

			break;

		case "toggleMenu":
			state.menuIsOpen = !state.menuIsOpen;

			break;

		default:
			throw Error("Website: action not found.");
	}

	return state;
}
