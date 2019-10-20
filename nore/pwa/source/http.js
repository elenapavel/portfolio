import qs from "@nore/std/url/query";
import fetch from "unfetch";
import store from "./store.js";

function toReply(response) {
	return response
		.json()
		.then(data => ({
			message: response.statusText,
			code: response.status,
			body: data,
		}))
		.catch(error => ({
			message: "HTTP response error",
			code: 400,
			body: error.message,
		}));
}

function request({ url, method = "GET", data = null, headers = {} }) {
	const options = {
		method,
		headers,
		credentials: "include",
	};

	if (data) {
		options.body = JSON.stringify(data);
		options.headers["content-type"] = "application/json";
	}

	// set network in progress flag
	store.set("network.inProgress", store.data.network.inProgress + 1);

	return fetch(url, options)
		.then(toReply)
		.then(reply => {
			// clear network in progress flag
			store.set("network.inProgress", store.data.network.inProgress - 1);

			// server error
			if (reply.code >= 500) throw reply;

			// procedure error
			if (reply.code >= 400) throw reply;

			return reply;
		});
}

export default {
	get(url, query) {
		if (query) {
			url += "?" + qs.stringify(query);
		}

		return request({ url, method: "GET" });
	},

	post(url, options = {}) {
		const { data, query, headers } = options;

		if (query) {
			url += "?" + qs.stringify(query);
		}

		return request({ url, data, headers, method: "POST" });
	},

	put(url, options = {}) {
		const { data, query, headers } = options;

		if (query) {
			url += "?" + qs.stringify(query);
		}

		return request({ url, data, headers, method: "PUT" });
	},

	delete(url, query) {
		if (query) {
			url += "?" + qs.stringify(query);
		}

		return request({ url, method: "DELETE" });
	},
};
