import React, { useState } from "react";
import TextField from "~/components/TextField";
import RepeaterField from "$admin/components/RepeaterField";
import RichTextField from "$admin/components/RichTextField";
import $, { css } from "./style.css";

function Services({ items, onChange }) {
	function onRender({ item, index, onChange }) {
		return (
			<>
				<TextField
					type="simple"
					label="Name"
					value={item.name || ""}
					onChange={value => onChange({ ...item, name: value })}
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

	function onAdd(items) {
		return { name: "", link: "" };
	}

	return (
		<RepeaterField
			items={items || []}
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
				<TextField
					type="simple"
					label="Category"
					class={$.list_category}
					value={item.category}
					onChange={value => onChange({ ...item, category: value })}
				/>
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
			items={items || []}
			onAdd={onAdd}
			onChange={onChange}
			onRender={onRender}
			add="+ Add category"
		/>
	);
}
