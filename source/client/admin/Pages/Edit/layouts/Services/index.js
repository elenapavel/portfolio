import React, { useState } from "react";
import RichTextField from "$admin/components/RichTextField";
import List from "./List.js";
import $, { css } from "./style.css";

export default ({ page, form, fields }) => {
	return (
		<b class={$.services}>
			<List
				items={fields.data.value.services || []}
				onChange={value =>
					fields.data.change({ ...fields.data.value, services: value })
				}
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
