import "prosemirror-view/style/prosemirror.css?raw";
import { Schema, Fragment } from "prosemirror-model";
import { history } from "prosemirror-history";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { dropCursor } from "prosemirror-dropcursor";
import setDevTools from "prosemirror-dev-tools";
import nodes from "./nodes";
import marks from "./marks";
import keymap from "./keymap.js";

import * as demo from "./demo.js";

const $nodes = nodes.addToEnd("circle", demo.circleNode);

export default options => {
	const schema = new Schema({
		topNode: "document",
		nodes: $nodes,
		marks,
	});

	const plugins = [history(), keymap({ schema }), dropCursor()];

	const state = EditorState.create({
		// plugins,
		schema,
		doc: demo.sample(schema),
	});

	const view = new EditorView(options.container, {
		state,
	});

	window.view = view;

	setDevTools(view);

	return {
		state,
		view,
	};
};
