import React, { useState } from "react";
import RichTextField from "$admin/components/RichTextField";
import $, { css } from "./style.css";

export default ({ page, form, fields }) => (
	<b class={$.default}>
		<RichTextField
			placeholder="..."
			value={fields.data.value.info || ""}
			onChange={value =>
				fields.data.change({ ...fields.data.value, info: value })
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
