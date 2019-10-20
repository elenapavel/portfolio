import React, { useState } from "react";
import TextField from "~/components/TextField";
import RichTextField from "$admin/components/RichTextField";
import RepeaterField from "$admin/components/RepeaterField";
import $, { css } from "./style.css";

export default ({ page, form, fields }) => {
	function onChangeEvent(value) {
		fields.data.change({ ...fields.data.value, events: value });
	}

	function onRenderEvent({ item, index, onChange }) {
		return (
			<>
				<TextField
					type="simple"
					label="Event"
					value={item.name}
					onChange={value => onChange({ ...item, name: value })}
				/>

				<TextField
					type="simple"
					label="Message"
					value={item.message}
					onChange={value => onChange({ ...item, message: value })}
				/>
			</>
		);
	}

	return (
		<b class={$.courses}>
			<RichTextField
				placeholder="..."
				value={fields.data.value.info || ""}
				onChange={value =>
					fields.data.change({ ...fields.data.value, info: value })
				}
			/>

			<b tag="delimiter">Courses</b>

			<RepeaterField
				items={fields.data.value.events || []}
				onAdd={() => ({ name: "", message: "" })}
				onChange={onChangeEvent}
				onRender={onRenderEvent}
				add="+ Add workshop"
			/>

			<TextField
				type="simple"
				label="Event footer note"
				class={$.event_note}
				value={fields.data.value.eventNote || ""}
				onChange={value =>
					fields.data.change({ ...fields.data.value, eventNote: value })
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
