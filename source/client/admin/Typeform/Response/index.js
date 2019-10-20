import React, { useContext } from "react";
import { store } from "@nore/pwa";
import $, { css } from "./style.css";

export default function TypeformResponse() {
	const { id } = store.get("url.query");
	const key = `typeform/response/${id}`;
	const data = localStorage.getItem(key);
	console.log(JSON.parse(data));
	const { questions, response } = JSON.parse(data);

	// clear local storage after data is read
	// localStorage.removeItem(key);

	return (
		<b class={$.container}>
			{questions.map((field, key) => {
				if (field.isHeader) {
					return (
						<b class={$.header} key={key}>
							{field.title}
						</b>
					);
				}

				const question = field.title;
				const answer = response.answers.find(a => a.field === field.id);
				const isInline = !answer
					? true
					: question.length + answer.data.length < 120;

				return (
					<b class={isInline ? $.field_inline : $.field} key={key}>
						<b class={$.question}>{question}</b>
						<b class={$.answer}>{answer ? answer.data : "–"}</b>
					</b>
				);
			})}
		</b>
	);
}
