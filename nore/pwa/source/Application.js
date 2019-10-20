import React, { useEffect, useState } from "react";
import Scope from "./Scope.js";
import Slot from "./Slot.js";
import history from "./history.js";
import navigate from "./navigate.js";
import store from "./store.js";

// ignore events with no state, as it might be triggered by a hashtag
// not a browser button action
const onHistory = event => event.state && store.reset(event.state);
const setDocumentTitle = title => (document.title = title);

export default function Application(props) {
	const [state, setState] = useState(store.data);

	function onStoreChange(state, oldState) {
		setState(state);

		// update document title on change
		if (state.title !== oldState.title) {
			setDocumentTitle(state.title);
		}
	}

	useEffect(() => {
		// listen to store updates
		store.on("change", onStoreChange);
		store.on("title", setDocumentTitle);

		// listen for browser history changes
		history.on("popstate", onHistory);

		// navigate to URL on initial load
		navigate(state.url, { replace: true });

		// set title on initial load
		setDocumentTitle(state.title);

		return () => {
			// remove listeners
			store.off("change", onStoreChange);
			store.off("title", setDocumentTitle);
			history.off("popstate", onHistory);
		};
	}, []);

	return (
		<Scope.Root context={store} path={state.url.path}>
			<Slot.Provider>{props.render || props.children}</Slot.Provider>
		</Scope.Root>
	);
}
