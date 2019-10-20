import { findWrapping, liftTarget, canSplit } from "prosemirror-transform";
import { liftListItem, sinkListItem } from "prosemirror-schema-list";
import { ReplaceAroundStep } from "prosemirror-transform";
import { Slice, Fragment, NodeRange } from "prosemirror-model";

export function wrapInList(nodeType, attrs) {
	return function(state, dispatch) {
		return sinkListItem(state, dispatch);
		const { $from, $to } = state.selection;
		const range = $from.blockRange($to);

		console.log(range);

		if (!range) return false;

		const toWrap = findWrapping(range, nodeType, attrs);

		return false;
		if (!toWrap) return false;

		if (dispatch) {
			let content = Fragment.empty;
			let n = toWrap.length;

			while (n--) {
				content = Fragment.from(
					toWrap[n].type.create(toWrap[n].attrs, content)
				);
			}

			const sliced = new Slice(content, 0, 0);
			const { tr } = state;

			tr.step(
				new ReplaceAroundStep(
					range.start,
					range.end,
					range.start,
					range.end,
					sliced,
					toWrap.length,
					true
				)
			);

			dispatch(tr);
		}

		return true;
	};
}

export function tester(schema) {
	return (state, dispatch) => {
		const { nodes } = state.doc.type.schema;
		const { $from } = state.selection;
		const index = $from.index();
		const canInsert = $from.parent.canReplaceWith(index, index, nodes.circle);

		if (!canInsert) return false;

		if (dispatch) {
			const entry = nodes.circle.create();

			dispatch(state.tr.replaceSelectionWith(entry));
		}

		return true;
	};
}
