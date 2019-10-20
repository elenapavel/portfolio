import React, { useState, cloneElement } from "react";
import Button from "~/components/Button";
import $, { css } from "./style.css";

import IconAdd from "assets/icons/feather/plus.svg?inline";
import IconRemove from "assets/icons/feather/x-square.svg?inline";

export default function RepeaterField(attrs) {
	function onAdd() {
		const list = attrs.items.slice();
		list.push(attrs.onAdd(list));
		attrs.onChange(list);
	}

	function onItem(item, index) {
		const element = attrs.onRender({ item, index, onChange });
		const content = cloneElement(element, { key: index });

		function onRemove() {
			const update = attrs.items.slice();
			const removed = update.splice(index, 1);

			if (attrs.onRemove) attrs.onRemove(removed.pop());

			attrs.onChange(update);
		}

		function onChange(value) {
			const update = attrs.items.slice();

			update[index] = value;
			attrs.onChange(update);
		}

		return (
			<b class={$.item} key={index} tag="repeaterfield_item">
				{content}

				<b class={$.action_remove} tag="repeaterfield_remove">
					<Button
						type="blank"
						label={attrs.remove || <IconRemove />}
						onClick={onRemove}
					/>
				</b>
			</b>
		);
	}

	return (
		<b class={css("container", attrs.className)} tag="repeaterfield">
			{attrs.items.map(onItem)}

			<b class={$.action_add} tag="repeaterfield_add">
				<Button
					wide
					type="blank"
					label={attrs.add || <IconAdd />}
					onClick={onAdd}
				/>
			</b>
		</b>
	);
}
