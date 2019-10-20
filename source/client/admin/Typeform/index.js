import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Scope, Link, http, store } from "@nore/pwa";
import $, { css } from "./style.css";

function Listing() {
	const [forms, setForms] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		http
			.get("/api/typeform/forms")
			.then(reply => {
				setForms(reply.body);
				setIsLoading(false);
			})
			.catch(reply => {
				setIsLoading(false);
				console.log("HTTP Error", reply);
			});
	}, []);

	if (!forms.length) {
		return (
			<b class={$.forms_state}>
				{isLoading ? "Loading forms..." : "No forms yet"}
			</b>
		);
	}

	return (
		<b class={$.forms}>
			<b class={$.title}>Forms</b>

			{forms.map((form, key) => (
				<Link
					to={`@admin/typeform?id=${form.id}`}
					class={$.forms_entry}
					key={key}
					label={form.title}
				/>
			))}
		</b>
	);
}

function Form(attrs) {
	const [form, setForm] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		http
			.get("/api/typeform/forms", { id: attrs.id })
			.then(reply => {
				setForm(reply.body);
				setIsLoading(false);
			})
			.catch(reply => {
				setIsLoading(false);
				console.log("HTTP Error", reply);
			});
	}, []);

	if (!form) {
		return (
			<b class={$.form_state}>
				{isLoading ? "Loading..." : "Something went wrong"}
			</b>
		);
	}

	function setResponseToLocalStorage(response) {
		localStorage.setItem(
			`typeform/response/${response.id}`,
			JSON.stringify({ response, questions: form.fields })
		);
	}

	return (
		<b class={$.form}>
			<b class={$.title}>{form.title}</b>
			<b class={$.form_responses}>
				{form.responses.map((response, key) => (
					<Link
						newtab
						to={`@admin/print/typeform/response?id=${response.id}`}
						onClick={() => setResponseToLocalStorage(response)}
						class={$.form_response}
						key={key}
					>
						{response.answers[0].data}

						<b class={$.form_response_date}>
							{format(new Date(response.submittedAt), "dd-MM-yyyy kk:mm")}
						</b>
					</Link>
				))}
			</b>
		</b>
	);
}

export default function Responses(attrs) {
	const { id } = store.get("url.query");

	return <b class={$.container}>{id ? <Form id={id} /> : <Listing />}</b>;
}
