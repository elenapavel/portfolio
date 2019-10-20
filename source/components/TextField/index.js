import React, { useState } from "react";
import $, { css } from "./style.css";

export default function TextField(attrs) {
	const [state, setState] = useState({ isFocused: false });
	const value = attrs.value || "";
	const isLabelSmall = state.isFocused || value.length;

	function onFocus(event) {
		setState({ isFocused: true });
	}

	function onBlur(event) {
		setState({ isFocused: false });
	}

	const classes = [attrs.type || "default", attrs.className];

	return (
		<b class={css(classes)} tag="textfield">
			<b class={isLabelSmall ? $.label_small : $.label} tag="textfield_label">
				{attrs.label}
			</b>

			<b class={css("border", { is_hidden: state.isFocused })} />
			<b class={css("border_accent", { is_visible: state.isFocused })} />

			<input
				type={attrs.mode}
				class={$.input}
				onFocus={onFocus}
				onBlur={onBlur}
				value={attrs.value}
				onChange={event => attrs.onChange(event.target.value)}
				tag="textfield_input"
			/>
		</b>
	);
}
