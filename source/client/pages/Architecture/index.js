import React, { useReducer } from "react";
import reducer from "./reducer.js";
import TopBar from "./TopBar";
import Content from "./Content";
import data from "./data.json";
import $, { css } from "./style.css";

export const ArchitectureState = React.createContext(null);
export const ArchitectureDispatch = React.createContext(null);

export default () => {
	const initialState = {
		logo: data.logo,
		quote: data.quote,
		categories: data.categories,
		articles: data.articles,
		selectedArticleIndex: 0,
		selectedCategoryLabel: "Argentina",
		lastSelectedArticleIndex: null,
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	const {
		logo,
		quote,
		selectedArticleIndex,
		lastSelectedArticleIndex,
		articles,
	} = state;

	const lastArticle =
		lastSelectedArticleIndex != null
			? articles[lastSelectedArticleIndex]
			: {
					title: "",
					content: [""],
					date: "",
					image: "",
					category: "",
					more: "",
					extras: { title: "", content: "" },
			  };

	return !state ? null : (
		<ArchitectureDispatch.Provider value={dispatch}>
			<ArchitectureState.Provider value={state}>
				<b className={$.application}>
					<b className={$.container}>
						<TopBar logo={logo} quote={quote} />
						<Content
							article={articles[selectedArticleIndex]}
							lastArticle={lastArticle}
							lastIndex={
								lastSelectedArticleIndex ? lastSelectedArticleIndex : 0
							}
							currentIndex={selectedArticleIndex}
							total={articles.length}
						/>
					</b>
				</b>
			</ArchitectureState.Provider>
		</ArchitectureDispatch.Provider>
	);
};
