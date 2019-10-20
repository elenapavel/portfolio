import React, { useState } from "react";
import TextField from "~/components/TextField";
import RepeaterField from "$admin/components/RepeaterField";
import RichTextField from "$admin/components/RichTextField";
import $, { css } from "./style.css";

export default ({ page, form, fields }) => {
	function onChangePromo(value) {
		fields.data.change({ ...fields.data.value, promos: value });
	}

	function onRenderPromo({ item, index, onChange }) {
		return (
			<>
				<RichTextField
					placeholder="..."
					value={item.content || ""}
					onChange={value => onChange({ ...item, content: value })}
				/>

				<TextField
					type="simple"
					label="Link"
					value={item.link || ""}
					onChange={value => onChange({ ...item, link: value })}
				/>
			</>
		);
	}

	return (
		<b class={$.container}>
			<b tag="delimiter">Quote</b>

			<TextField
				type="simple"
				label="Quote"
				class={$.quote}
				value={fields.data.value.quote || ""}
				onChange={value =>
					fields.data.change({ ...fields.data.value, quote: value })
				}
			/>
			<TextField
				type="simple"
				label="Author"
				value={fields.data.value.quoteAuthor || ""}
				onChange={value =>
					fields.data.change({ ...fields.data.value, quoteAuthor: value })
				}
			/>

			<b tag="delimiter">Content</b>

			<TextField
				type="simple"
				label="Title"
				value={fields.data.value.title || ""}
				onChange={value =>
					fields.data.change({ ...fields.data.value, title: value })
				}
			/>
			<RichTextField
				placeholder="..."
				value={fields.data.value.info || ""}
				onChange={value =>
					fields.data.change({ ...fields.data.value, info: value })
				}
			/>

			<b tag="delimiter">Promos</b>

			<RepeaterField
				items={fields.data.value.promos || []}
				onAdd={() => ({ content: "", url: "" })}
				onChange={onChangePromo}
				onRender={onRenderPromo}
				add="+ Add promo"
			/>

			<b tag="delimiter">Footer</b>

			<RichTextField
				placeholder="..."
				value={fields.data.value.footer || ""}
				onChange={value =>
					fields.data.change({ ...fields.data.value, footer: value })
				}
			/>
		</b>
	);
};
