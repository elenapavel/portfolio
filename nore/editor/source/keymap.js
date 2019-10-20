import { baseKeymap, toggleMark } from "prosemirror-commands";
import { undo, redo } from "prosemirror-history";
import { AllSelection } from "prosemirror-state";
import { keymap } from "prosemirror-keymap";
import { wrapInList, tester } from "./commands.js";

export default ({ schema }) =>
	keymap({
		// ...baseKeymap,

		// history
		"mod-z": undo,
		"shift-mod-z": redo,

		// markup
		"mod-b": toggleMark(schema.marks.strong),
		"mod-i": toggleMark(schema.marks.em),

		// blocks
		// TODO: implement the same shortcuts as in Dropbox Paper

		// TODO: remove
		"ctrl-g": wrapInList(schema.nodes.list, { isOrdered: true }),
		"ctrl-a": tester(schema),
	});
