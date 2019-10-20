import React, { useState, useRef } from "react";
import { http, store } from "@nore/pwa";
import Button from "~/components/Button";
import HTMLEditor from "~/components/HTMLEditor";
import useArticleForm from "./useArticleForm.js";
import $, { css } from "./style.css";
import samples from "../List/samples.js";

export default ({ scope }) => {
	const id = store.data.url.query.id;
	const data = samples.filter(i => i.id === id).pop();
	const { form, title, content } = useArticleForm(data);
	const errors = form.fields.map(f => f.error).filter(Boolean);

	return (
		<b class={$.container}>
			<b class={$.title}>
				<input
					placeholder="Title"
					class={$.title_input}
					value={title.value}
					ref={title.ref}
					onChange={e => title.change(e.target.value)}
				/>
			</b>

			<HTMLEditor
				placeholder="…"
				class={$.content}
				value={content.value}
				onChange={html => content.change(html)}
			/>

			{!errors.length ? null : (
				<b class={$.field_errors}>
					{errors.map((error, key) => (
						<b key={key} class={$.field_error}>
							{error}
						</b>
					))}
				</b>
			)}

			<b class={$.actions}>
				<Button
					label="Save"
					type="flat"
					is="secondary"
					size="small"
					onClick={() => form.submit()}
				/>
			</b>
		</b>
	);
};
