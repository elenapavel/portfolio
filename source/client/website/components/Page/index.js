import React, { useState, useEffect, createElement } from "react";
import NotFound from "$website/pages/NotFound";
import cache from "$website/cache";
import { http } from "@nore/pwa";
import $, { css } from "./style.css";

export default function Page({ path, layout }) {
	const [page, setPage] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// const page = IS_DEVELOPMENT ? null : cache.get(path);

		// // try to load from cache
		// if (page) {
		// 	setPage(page);
		// 	setIsLoading(false);
		// }
		// // load from the server
		// else {
		http
			.get(`/api/pages`, { path })
			.then(reply => {
				const page = reply.body.data.pop();

				cache.set(path, page);
				setPage(page);
				setIsLoading(false);
			})
			.catch(reply => {
				setIsLoading(false);
				console.log("HTTP Error", reply);
			});
		// }
	}, []);

	const content = !page ? (
		<NotFound />
	) : (
		createElement(layout, { page, data: page.data })
	);

	return (
		<b class={$.container} style={{ opacity: isLoading ? 0 : 1 }}>
			{isLoading ? null : content}
		</b>
	);
}
