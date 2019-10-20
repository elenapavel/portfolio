const FORMAT = ["p", 0];

// :: A plain paragraph text block
// -> <p>
export default {
	group: "block",
	content: "inline*",
	toDOM: node => FORMAT,
	parseDOM: [{ tag: "p" }],
};
