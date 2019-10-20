import React, { useState } from "react";
import { get, set } from "@nore/std/object";
import RichTextField from "$admin/components/RichTextField";
import $, { css } from "./style.css";

export default ({ page, form, fields }) => (
	<b class={$.home}>
		<RichTextField
			placeholder="Title"
			value={get(fields.data.value, ["title"])}
			onChange={value =>
				fields.data.change({ ...fields.data.value, title: value })
			}
		/>

		<RichTextField
			placeholder="Subtitle"
			value={get(fields.data.value, ["subtitle"])}
			onChange={value =>
				fields.data.change({ ...fields.data.value, subtitle: value })
			}
		/>

		<RichTextField
			placeholder="Featured text"
			value={get(fields.data.value, ["featured", "text"])}
			onChange={value => {
				const data = { ...fields.data.value };
				set(data, ["featured", "text"], value);
				fields.data.change(data);
			}}
		/>

		<RichTextField
			placeholder="Featured note"
			value={get(fields.data.value, ["featured", "note"])}
			onChange={value => {
				const data = { ...fields.data.value };
				set(data, ["featured", "note"], value);
				fields.data.change(data);
			}}
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
