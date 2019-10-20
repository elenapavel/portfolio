import React, { useEffect, useReducer } from "react";
import { debounce } from "@nore/std/utils";
import pages from "./pages";
import initialState from "./state.js";
import reducer from "./reducer.js";
import $, { css } from "./style.css";

export const State = React.createContext(null);
export const Dispatch = React.createContext(null);

export default function Website(attrs) {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(initialize, []);

	function initialize() {
		const onResize = debounce(setNavigationIsMobile, 200);

		function setNavigationIsMobile() {
			dispatch("navigation.isMobile");
		}

		if (!IS_DEVELOPMENT) {
			import("./analytics.js").then(analytics => analytics.initialize());
		}

		setNavigationIsMobile();
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}

	return (
		<Dispatch.Provider value={dispatch}>
			<State.Provider value={state}>
				<b class={$.container}>{pages}</b>
			</State.Provider>
		</Dispatch.Provider>
	);
}
