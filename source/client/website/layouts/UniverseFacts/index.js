import React, { useReducer } from "react";
import reducer from "./reducer.js";
import store from "./store.js";
import CategoryView from "./CategoryView";
import ArticleView from "./ArticleView";

import $ from "./style.css";

export const UniverseState = React.createContext(null);
export const UniverseDispatch = React.createContext(null);

export default ({ data }) => {
	const initialState = {
		categories: data.categories,
		articles: data.articles,
		...store,
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<UniverseDispatch.Provider value={dispatch}>
			<UniverseState.Provider value={state}>
				<div className={$.application}>
					<CategoryView />
					<ArticleView />
				</div>
			</UniverseState.Provider>
		</UniverseDispatch.Provider>
	);
};
