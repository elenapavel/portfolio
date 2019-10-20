import React, { useEffect, useState } from "react";
import { Link, http } from "@nore/pwa";
import $, { css } from "./style.css";

export default () => {
	const [pages, setPages] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		http
			.get("/api/pages")
			.then(reply => {
				setPages(reply.body.data);
				setIsLoading(false);
			})
			.catch(reply => {
				setIsLoading(false);
				console.log("HTTP Error", reply);
			});
	}, []);

	const content = !pages.length ? (
		<b class={$.loading}>{isLoading ? "Loading pages..." : "No pages yet"}</b>
	) : (
		<b class={$.list}>
			{pages
				.sort((a, b) => (a.name > b.name ? 1 : -1))
				.map((page, key) => (
					<Link
						key={key}
						class={$.item}
						label={page.name}
						to={`@admin/pages/edit?id=${page.id}`}
					/>
				))}
		</b>
	);

	return (
		<b class={$.container}>
			<b class={$.title}>Pages</b>
			<b class={$.content}>{content}</b>
		</b>
	);
};
