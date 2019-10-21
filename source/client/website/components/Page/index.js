import React, { useState, useEffect, createElement } from "react";
import NotFound from "$website/pages/NotFound";
import cache from "$website/cache";
import { http } from "@nore/pwa";
import $, { css } from "./style.css";

export default function Page({ path, layout }) {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getPath = path == "/" ? "/home" : path;

		http.get(`${getPath}/data.json`, {})
			.then(reply => {
				// console.log(reply);
				const data = reply.body;
				setData(data);
				setIsLoading(false);
			})
			.catch(reply => {
				setIsLoading(false);
				console.log("HTTP Error", reply);
			});
	}, []);

	const content = !data ? (
		<NotFound />
	) : (
		createElement(layout, { data, isLoading })
	);

	return (
		<b class={$.container} style={{ opacity: isLoading ? 0 : 1 }}>
			{isLoading ? null : content}
		</b>
	);
}
