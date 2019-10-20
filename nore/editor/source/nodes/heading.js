// :: A heading text block
// -> <h1>
export default {
	defining: true,
	group: "block",
	content: "inline*",
	attrs: { level: { default: 1 } },
	toDOM: node => ["h" + node.attrs.level, 0],
	parseDOM: [
		{ tag: "h1", attrs: { level: 1 } },
		{ tag: "h2", attrs: { level: 2 } },
		{ tag: "h3", attrs: { level: 3 } },
		{ tag: "h4", attrs: { level: 4 } },
		{ tag: "h5", attrs: { level: 5 } },
		{ tag: "h6", attrs: { level: 6 } },
	],
};
