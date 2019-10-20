import React, { useState } from "react";
import TextField from "~/components/TextField";
import RichTextField from "$admin/components/RichTextField";
import $, { css } from "./style.css";

export default ({ page, form, fields }) => (
	<b class={$.container}>
		<RichTextField
			placeholder="..."
			value={fields.data.value.info || ""}
			onChange={value =>
				fields.data.change({ ...fields.data.value, info: value })
			}
		/>

		<b tag="delimiter">Registration</b>

		<RichTextField
			placeholder="..."
			value={fields.data.value.registrationMessage || ""}
			onChange={value =>
				fields.data.change({ ...fields.data.value, registrationMessage: value })
			}
		/>

		<TextField
			type="simple"
			label="Form link"
			value={fields.data.value.registrationLink || ""}
			onChange={value =>
				fields.data.change({ ...fields.data.value, registrationLink: value })
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
