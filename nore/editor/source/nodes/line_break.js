const FORMAT = ["br"];

// :: A hard line break
// -> <br>
export default {
	inline: true,
	selectable: false,
	group: "inline",
	toDOM: node => FORMAT,
	parseDOM: [{ tag: "br" }],
};
