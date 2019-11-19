import { isString } from "@nore/std/assert";

export default function reducer(previous, action) {
	const command = isString(action) ? action : action.type;
	const state = { ...previous };

	switch (command) {
		case "selectArticleIndex":
			const articleIndex = action.index;

			state.lastSelectedArticleIndex = state.selectedArticleIndex;
			state.selectedArticleIndex = articleIndex;
			state.selectedCategoryLabel = state.articles[articleIndex].category;

			break;

		case "selectArticleByCategoryIndex":
			const categoryIndex = action.index;

			state.articles.forEach((article, key) => {
				if (article.category == state.categories[categoryIndex].label) {
					state.lastSelectedArticleIndex = state.selectedArticleIndex;
					state.selectedArticleIndex = key;
					state.selectedCategoryLabel =
						state.categories[categoryIndex].label;
				}
			});

			break;

		case "set":
			state = action.initialState;

			break;

		default:
			throw Error("Website: action not found.");
	}

	return state;
}
