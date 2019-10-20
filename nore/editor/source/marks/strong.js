const FONT_WEIGHT_BOLD = /^(bold(er)?|[5-9]\d{2,})$/;
const FORMAT = ["strong"];

// :: A strong mark
export default {
	toDOM: node => FORMAT,
	parseDOM: [
		{ tag: "strong" },
		// This works around a Google Docs misbehavior where
		// pasted content will be inexplicably wrapped in `<b>`
		// tags with a font-weight normal.
		{ tag: "b", getAttrs: node => node.style.fontWeight != "normal" && null },
		{
			style: "font-weight",
			getAttrs: value => FONT_WEIGHT_BOLD.test(value) && null,
		},
	],
};
