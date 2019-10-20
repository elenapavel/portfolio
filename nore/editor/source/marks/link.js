// :: A link
export default {
	inclusive: false,
	attrs: {
		href: {},
		title: { default: null },
	},
	toDOM: node => {
		const { href, title } = node.attrs;

		return ["a", { href, title }, 0];
	},
	parseDOM: [
		{
			tag: "a[href]",
			getAttrs: dom => ({
				href: dom.getAttribute("href"),
				title: dom.getAttribute("title"),
			}),
		},
	],
};
