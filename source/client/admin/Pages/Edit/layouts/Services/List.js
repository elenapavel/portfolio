import React, { useState } from "react";
import TextField from "~/components/TextField";
import RepeaterField from "$admin/components/RepeaterField";
import RichTextField from "$admin/components/RichTextField";
import $, { css } from "./style.css";

function Services({ items, onChange }) {
	function onRender({ item, index, onChange }) {
		return (
			<b class={$.service}>
				<TextField
					type="simple"
					label="Service"
					value={item.name || ""}
					onChange={value => onChange({ ...item, name: value })}
				/>

				<TextField
					class={$.service_time}
					type="simple"
					label="Time"
					value={item.time || ""}
					onChange={value => onChange({ ...item, time: value })}
				/>

				<TextField
					class={$.service_price}
					type="simple"
					label="Price"
					value={item.price || ""}
					onChange={value => onChange({ ...item, price: value })}
				/>
			</b>
		);
	}

	function onAdd(items) {
		return { name: "", time: "", price: "" };
	}

	return (
		<RepeaterField
			items={items}
			onAdd={onAdd}
			onChange={onChange}
			onRender={onRender}
		/>
	);
}

export default function Categories({ items, onChange }) {
	function onRender({ item, index, onChange }) {
		return (
			<>
				<b class={$.list_header}>
					<TextField
						type="simple"
						label="Category"
						class={$.list_category}
						value={item.category || ""}
						onChange={value => onChange({ ...item, category: value })}
					/>
					<TextField
						type="simple"
						label="Link"
						class={$.list_link}
						value={item.link || ""}
						onChange={value => onChange({ ...item, link: value })}
					/>
				</b>

				<Services
					items={item.items}
					onChange={value => onChange({ ...item, items: value })}
				/>
			</>
		);
	}

	function onAdd(items) {
		return { category: "", items: [] };
	}

	return (
		<RepeaterField
			class={$.list}
			items={items}
			onAdd={onAdd}
			onChange={onChange}
			onRender={onRender}
			add="+ Add category"
		/>
	);
}
