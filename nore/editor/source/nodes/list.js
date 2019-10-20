// :: A list block
// -> <ul> | <ol>
export const list = {
	group: "block",
	content: "list_item+",
	attrs: {
		level: { default: 1 },
		isOrdered: { default: false },
	},
	toDOM(node) {
		const { isOrdered, level } = node.attrs;
		const tag = isOrdered ? "ol" : "ul";

		return [tag, { level }, 0];
	},
	parseDOM: [
		{
			tag: "ul",
			getAttrs: dom => ({
				isOrdered: false,
				level: dom.hasAttribute("level") ? +dom.getAttribute("level") : 1,
			}),
		},
		{
			tag: "ol",
			getAttrs: dom => ({
				isOrdered: true,
				level: dom.hasAttribute("level") ? +dom.getAttribute("level") : 1,
			}),
		},
	],
};

export const list_item = {
	defining: true,
	content: "paragraph block*",
	toDOM: node => ["li", 0],
	parseDOM: [{ tag: "li" }],
};
