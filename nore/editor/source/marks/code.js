const FORMAT = ["code"];

// :: Code font mark
export default {
	toDOM: node => FORMAT,
	parseDOM: [{ tag: "code" }],
};
