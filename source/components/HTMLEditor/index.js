import "quill/dist/quill.snow.css?raw";
import React, { useState, useEffect, useRef } from "react";
import Quill from "quill";
import { assign } from "@nore/std/object";
import { debounce } from "@nore/std/utils";
import HTML from "~/components/HTML";
import defaults from "./settings.js";
import $, { css } from "./style.css";
import "./quill.css?raw";

export default function QuillEditor(attrs) {
	const ref = useRef(null);
	const editorRef = useRef(null);

	useEffect(() => {
		const settings = assign({}, defaults, attrs.settings, {
			placeholder: attrs.placeholder,
		});

		const editor = new Quill(ref.current, settings);
		const onChange = debounce(attrs.onChange, settings.onChangeDelay);

		// set content on Quill
		editor.setContents(editor.clipboard.convert(attrs.value));

		// handle text change
		editor.on("editor-change", (event, delta, oldDelta, source) => {
			if (event === Quill.events.TEXT_CHANGE) {
				onChange(editor.root.innerHTML, delta, oldDelta, source);
			}
		});

		// set editor instance
		editorRef.current = editor;

		return () => (editorRef.current = null);
	}, []);

	return (
		<b class={css("editor", attrs.className)} tag="htmleditor">
			<b class={$.content} ref={ref}></b>
		</b>
	);
}
