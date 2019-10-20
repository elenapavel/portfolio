const FORMAT = ["hr"];

// :: A horizontal rule
// -> <hr>
export default {
	group: "block",
	toDOM: node => FORMAT,
	parseDOM: [{ tag: "hr" }],
};
