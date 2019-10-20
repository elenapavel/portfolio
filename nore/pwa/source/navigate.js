import isString from "@nore/std/assert/isString";
import keys from "@nore/std/object/keys";
import parseURL from "@nore/std/url/parse";
import qs from "@nore/std/url/query";
import history from "./history.js";
import store from "./store.js";

function getURL(to) {
	if (isString(to)) {
		const url = parseURL(to);

		return {
			path: url.pathname.toLowerCase(),
			query: url.query ? qs.parse(url.query) : {},
			hash: url.hash || "",
		};
	}

	return {
		path: to.path ? to.path.toLowerCase() : "/",
		query: to.query || {},
		hash: to.hash || "",
	};
}

function getKey({ path, query, hash }) {
	const querystring = keys(query).length ? "?" + qs.stringify(query) : "";

	return path + querystring + hash;
}

function navigate(to, { replace }) {
	const url = getURL(to);
	const key = getKey(url);

	store.change({ url });

	if (replace) {
		history.replace(key, store.data);
	} else {
		history.push(key, store.data);
	}

	// scroll to top of the page
	window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}

export default (to, options = {}) =>
	options.delay != null
		? setTimeout(() => navigate(to, options), options.delay)
		: navigate(to, options);
