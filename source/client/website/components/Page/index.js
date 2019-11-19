import React, { useState, useEffect, createElement, useCallback } from "react";
import NotFound from "$website/pages/NotFound";
import cache from "$website/cache";
import { http } from "@nore/pwa";
import $, { css } from "./style.css";

const absolutePath = IS_DEVELOPMENT ? "" : "/portfolio";
const publicPath = IS_DEVELOPMENT ? "" : "/public";

export default function Page({ path, layout }) {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const memtest = useCallback(
		path => {
			const getPath = path == "/" ? "/home" : path;

			http.get(`${absolutePath}${publicPath}/data.json`, {})
				.then(reply => {
					const data = reply.body.find(
						element => "/" + element.id == getPath
					);
					setData(data);
					setIsLoading(false);
				})
				.catch(reply => {
					setIsLoading(false);
					console.log("HTTP Error", reply);
				});
		},
		[path]
	);

	useEffect(() => {
		memtest(path);
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
