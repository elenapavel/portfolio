import qs from "@nore/std/url/query";
import store from "./utils/store.js";

// initial application state
const state = {
	title: "",
	url: {
		path: "/",
		query: {},
		hash: "",
	},
	network: {
		inProgress: false,
		isOffline: false,
	},
};

// in browsers try to get initial path and title from the DOM
if (__WEB__) {
	state.title = document.title;
	state.url.path = location.pathname;

	if (location.search) {
		state.url.query = qs.parse(location.search.slice(1));
	}

	if (location.hash) {
		state.url.hash = location.hash;
	}
}

export default store(state);
