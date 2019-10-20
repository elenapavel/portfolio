const FORMAT = ["pre", 0];

// :: A code block, disallows marks or non-text inline nodes
// -> <pre>
export default {
	defining: true,
	code: true,
	group: "block",
	content: "text*",
	marks: "",
	toDOM: node => FORMAT,
	parseDOM: [{ tag: "pre", preserveWhitespace: "full" }],
};
