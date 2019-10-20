// :: An inline image
// -> <img>
export default {
	inline: true,
	group: "inline",
	draggable: true,
	attrs: {
		src: {},
		alt: { default: null },
		title: { default: null },
	},
	toDOM: node => {
		const { src, alt, title } = node.attrs;

		return ["img", { src, alt, title }];
	},
	parseDOM: [
		{
			tag: "img[src]",
			getAttrs(dom) {
				return {
					src: dom.getAttribute("src"),
					alt: dom.getAttribute("alt"),
					title: dom.getAttribute("title"),
				};
			},
		},
	],
};
