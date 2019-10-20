const FORMAT = ["em"];

// :: An emphasis mark
export default {
	toDOM: node => FORMAT,
	parseDOM: [{ tag: "i" }, { tag: "em" }, { style: "font-style=italic" }],
};
