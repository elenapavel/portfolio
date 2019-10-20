const FORMAT = ["blockquote", 0];

// :: A blockquote wrapping one or more blocks
// -> <blockquote>
export default {
	defining: true,
	group: "block",
	content: "block+",
	toDOM: node => FORMAT,
	parseDOM: [{ tag: "blockquote" }],
};
