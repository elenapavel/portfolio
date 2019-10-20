import React, { useEffect, useState } from "react";
import { http } from "@nore/pwa";
import Form from "./Form";
import $, { css } from "./style.css";

export default ({ id }) => {
	const [page, setPage] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		http
			.get(`/api/pages/${id}`)
			.then(reply => {
				setPage(reply.body);
				setIsLoading(false);
			})
			.catch(reply => {
				setIsLoading(false);
				console.log("HTTP Error", reply);
			});
	}, []);

	if (isLoading) return <b class={$.loading}>Loading...</b>;
	if (!page) return <b class={$.loading}>The page was not found</b>;

	return (
		<b class={$.container}>
			<b class={$.title}>{page.name}</b>
			<b class={$.content}>
				<Form page={page} />
			</b>
		</b>
	);
};
