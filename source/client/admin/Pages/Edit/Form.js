import React, { useState } from "react";
import TextField from "~/components/TextField";
import Button from "~/components/Button";
import layouts from "./layouts";
import useEditForm from "./useEditForm.js";
import $, { css } from "./style.css";

export default ({ page }) => {
	const { form, fields } = useEditForm(page);
	const Layout = layouts[page.layout] || layouts.Default;

	return (
		<b class={$.form}>
			<Layout page={page} form={form} fields={fields} />

			<b tag="delimiter">page meta</b>

			<b class={$.form_default_fields}>
				<TextField
					type="simple"
					label="Title"
					name={fields.title.name}
					value={fields.title.value}
					error={fields.title.error}
					onChange={fields.title.change}
				/>

				<TextField
					type="simple"
					label="Description"
					name={fields.description.name}
					value={fields.description.value}
					error={fields.description.error}
					onChange={fields.description.change}
				/>

				<b class={$.form_field_break}></b>

				<TextField
					type="simple"
					label="Name"
					name={fields.name.name}
					value={fields.name.value}
					error={fields.name.error}
					onChange={fields.name.change}
				/>

				<TextField
					type="simple"
					label="Path"
					name={fields.path.name}
					value={fields.path.value}
					error={fields.path.error}
					onChange={fields.path.change}
				/>

				<TextField
					type="simple"
					label="Layout"
					name={fields.layout.name}
					value={fields.layout.value}
					error={fields.layout.error}
					onChange={fields.layout.change}
				/>

				<TextField
					type="simple"
					label="State"
					name={fields.state.name}
					value={fields.state.value}
					error={fields.state.error}
					onChange={fields.state.change}
				/>
			</b>

			<b class={$.form_actions}>
				<Button
					is="primary"
					label={form.isDisabled ? "Saving" : "Save"}
					onClick={form.submit}
				/>
			</b>
		</b>
	);
};
